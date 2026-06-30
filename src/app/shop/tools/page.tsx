import PageHero from "@/components/ui/PageHero";
import ShopComingSoon from "@/components/shop/ShopComingSoon";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero
        variant="compact"
        title="Tools"
        subtitle="New arrivals landing very soon"
      />
      <ShopComingSoon categoryName="Tools" />
    </main>
  );
}
