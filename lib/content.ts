import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { isFunction, isIndustry, type Industry, type PromptFunction } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Service {
  title: string;
  slug: string;
  order: number;
  summary: string;
  body: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  bestFor: string;
  link: string;
  pros: string[];
  cons: string[];
  body: string;
}

export interface Prompt {
  slug: string;
  title: string;
  function: PromptFunction;
  industries: Industry[];
  useCase: string;
  tags: string[];
  body: string;
  /** Raw prompt text extracted from the first fenced code block in the body. */
  promptText: string;
}

function readCollection(collection: string) {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

export function getServices(): Service[] {
  return readCollection("services")
    .map(({ data, content }) => ({
      title: data.title as string,
      slug: data.slug as string,
      order: data.order as number,
      summary: data.summary as string,
      body: content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getProducts(): Product[] {
  return readCollection("products")
    .map(({ slug, data, content }) => ({
      slug,
      name: data.name as string,
      category: data.category as string,
      description: data.description as string,
      bestFor: data.bestFor as string,
      link: data.link as string,
      pros: (data.pros ?? []) as string[],
      cons: (data.cons ?? []) as string[],
      body: content,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getProductCategories(): string[] {
  return Array.from(new Set(getProducts().map((p) => p.category))).sort();
}

function extractPromptText(body: string): string {
  const fence = body.match(/```[^\n]*\n([\s\S]*?)```/);
  if (fence) return fence[1].trim();
  const quote = body
    .split("\n")
    .filter((line) => line.startsWith(">"))
    .map((line) => line.replace(/^>\s?/, ""))
    .join("\n")
    .trim();
  return quote || body.trim();
}

export function getPrompts(): Prompt[] {
  return readCollection("prompts")
    .map(({ slug, data, content }) => {
      const fn = (data.function as string) ?? "operations";
      const industries = ((data.industries ?? []) as string[]).filter(isIndustry);
      return {
        slug,
        title: data.title as string,
        function: isFunction(fn) ? fn : "operations",
        industries,
        useCase: data.useCase as string,
        tags: (data.tags ?? []) as string[],
        body: content,
        promptText: extractPromptText(content),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getPromptsByFunction(fn: PromptFunction): Prompt[] {
  return getPrompts().filter((p) => p.function === fn);
}

export function getPromptsByIndustry(ind: Industry): Prompt[] {
  return getPrompts().filter((p) => p.industries.includes(ind));
}

export function getPrompt(slug: string): Prompt | undefined {
  return getPrompts().find((p) => p.slug === slug);
}
