import TracePage from "./trace-page";

export const metadata = {
  title: "Run Trace & Attribution - FaultTrace RAG",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TracePage runId={id} />;
}
