export default async function ParentSchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Read-only school detail view for parents.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">
          Parent school view coming in Sprint 6.
        </p>
      </div>
    </div>
  )
}
