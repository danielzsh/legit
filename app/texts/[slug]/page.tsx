import { Text } from '@/components/text';
import fs from 'fs';

export default async function Page({ params }: { params: { slug: string } }) {
  const text = fs.readFileSync(process.cwd() + `/app/texts/${params.slug}.md`, 'utf8');
  return <Text text={text} />
}
