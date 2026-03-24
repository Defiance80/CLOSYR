"use client";

import { usePathname } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlaceholderPage() {
  const pathname = usePathname();
  const pageName = pathname.split('/').pop() || 'page';
  const capitalizedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{capitalizedName}</h1>
          <p className="text-muted-foreground">This feature is coming in a future phase</p>
        </div>

        <Card className="glassmorphic">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Feature In Development</h3>
            <p className="text-muted-foreground">
              The {capitalizedName} module will be available in Phase 2 of the CLOSYR platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
