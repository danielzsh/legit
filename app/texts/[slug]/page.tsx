import { Text } from '@/components/text';
import { promises as fs } from 'fs';
export default async function Page({ params }: { params: { slug: string } }) {
  const text = await fs.readFile(process.cwd() + `/texts/${params.slug}.md`, 'utf8');
  return <Text text={text} />
}
