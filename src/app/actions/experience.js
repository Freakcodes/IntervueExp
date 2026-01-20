"use server";

import pool from "@/lib/db";
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
        edit_token
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
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
