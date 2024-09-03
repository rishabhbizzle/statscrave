import Link from 'next/link';
import { useComparison } from '../context/ComparisonContext';
import { Button } from './ui/button';

function ComparisonButton() {
  const { comparisonList } = useComparison();

  if (comparisonList.length === 0) return null;

  return (
    <Link href="/compare">
      <Button className="fixed bottom-4 right-4">
        Compare ({comparisonList.length})
      </Button>
    </Link>
  );
}