"use server";

import pool from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

function generateEditToken(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return token;
}

export async function createExperience(data) {
  const {
    name,
    company,
    role,
    college,
    interviewType,
    result,
    tags,
    experience,
    experienceLevel,
    additionalTips
  } = data;

  if (!company || !role || !interviewType || !result || !experience) {
    throw new Error("Missing required fields");
  }

  if (experience.length < 100) {
    throw new Error("Experience must be at least 100 characters");
  }

  const parsedTags = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const editToken = generateEditToken(8);

  try {
    await pool.query(
      `
      INSERT INTO experiences (
        name,
        company,
        role,
        college,
        interview_type,
        result,
        tags,
        experience,
        edit_token,
        experience_level,
        additional_tips
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      `,
      [
        name || null,
        company,
        role,
        college || null,
        interviewType,
        result,
        parsedTags,
        experience,
        editToken,
        experienceLevel,
        additionalTips || null
      ],
    );

    revalidatePath("/explore");

    return {
      success: true,
      editToken,
    };
  } catch (error) {
    console.error("Create experience error:", error);
    return {
      success: false,
      message: "Failed to submit experience",
    };
  }
}

export async function getExperiences() {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        name,
        company,
        role,
        college,
        interview_type,
        result,
        tags,
        experience,
        created_at
      FROM experiences
      ORDER BY created_at DESC
    `);

    return rows;
  } catch (error) {
    console.error("Get experiences error:", error);
    throw new Error("Failed to fetch experiences");
  }
}

/**
 * Fetch a single interview experience by ID
 */
export async function getExperiencesById(id) {


 
  
  if (!id) return null;

  try {
    const { rows } = await pool.query(
      `
      SELECT
        id,
        name,
        company,
        role,
        college,
        interview_type AS "interviewType",
        result,
        tags,

        experience,
        experience_level AS "experienceLevel",
        additional_tips AS "additionalTips",
        views,
        created_at
      FROM experiences
      WHERE id = $1
      LIMIT 1;
      `,
      [id],
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching experience by id:", error);
    return null;
  }
}


export async function searchExperiences({
  query = "",
  result = "all",
  page = 1,
  limit = 10,
}) {
  const values=[];
  const conditions=[];

  // Search by company
  //by using like
  if (query) {
    values.push(`%${query}%`);
    conditions.push(`company ILIKE $${values.length}`);
  }



  // Filter by result
  if (result !== "all") {
    values.push(result);
    conditions.push(`result = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  // Pagination
  const offset = (page - 1) * limit;
  values.push(limit);
  values.push(offset);

  const sql = `
    SELECT
      id,
      name,
      company,
      role,
      college,
      interview_type AS "interviewType",
      result,
      tags,
      experience,
      created_at
    FROM experiences
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${values.length - 1}
    OFFSET $${values.length};
  `;

  const { rows } = await pool.query(sql, values);
  return rows;
}

export async function getExperienceByEditToken(token) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      name,
      company,
      role,
      college,
      interview_type AS "interviewType",
      result,
      tags,
      experience,
      experience_level AS "experienceLevel",
      additional_tips AS "additionalTips"
    FROM experiences
    WHERE edit_token = $1
    LIMIT 1
    `,
    [token]
  );

  return rows[0] || null;
}


export async function updateExperience(token, data) {
  const {
    name,
    company,
    role,
    college,
    interviewType,
    result,
    tags,
    experience,
    experienceLevel,
    additionalTips,
  } = data;

  await pool.query(
    `
    UPDATE experiences
    SET
      name = $1,
      company = $2,
      role = $3,
      college = $4,
      interview_type = $5,
      result = $6,
      tags = string_to_array($7, ','),
      experience = $8,
      experience_level = $9,
      additional_tips = $10
    WHERE edit_token = $11
    `,
    [
      name,
      company,
      role,
      college,
      interviewType,
      result,
      tags,
      experience,
      experienceLevel,
      additionalTips,
      token,
    ]
  );

  return { success: true };
}

export async function trackExperienceView(id) {
  const cookieStore = await cookies();
  const cookieName = `viewed-${id}`;

  // Already viewed → do nothing
  if (cookieStore.get(cookieName)) {
    return { viewed: false };
  }

  // Increment views
  await pool.query(
    `UPDATE experiences SET views = views + 1 WHERE id = $1`,
    [id]
  );

  // Set cookie (24 hours)
  cookieStore.set(cookieName, "true", {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: "lax",
  });

  return { viewed: true };
}



