export function generateStaticParams() {
  // Generate params for projects 1-8
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 