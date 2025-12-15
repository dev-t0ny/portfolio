import fm from "front-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

interface PostAttributes {
  title: string;
  date: string;
  description: string;
}

export function useBlog() {
  const modules = import.meta.glob("../content/*.md", {
    as: "raw",
    eager: true,
  });

  const posts: Post[] = Object.keys(modules).map((path) => {
    const fileContent = modules[path] as string;

    const parsed = fm<PostAttributes>(fileContent);

    const slug = path.split("/").pop()?.replace(".md", "") || "";

    return {
      slug,
      title: parsed.attributes.title,
      date: parsed.attributes.date,
      description: parsed.attributes.description,
      content: parsed.body,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
}
