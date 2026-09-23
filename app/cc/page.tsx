import { permanentRedirect } from "next/navigation";

export default async function ContentColonyRedirect({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const qs =
    resolved && Object.keys(resolved).length > 0
      ? "?" +
        new URLSearchParams(
          Object.entries(resolved).flatMap(([k, v]) =>
            Array.isArray(v) ? v.map((item) => [k, item]) : v !== undefined ? [[k, v]] : []
          )
        ).toString()
      : "";

  permanentRedirect(`/content-colony${qs}`);
}
