import AdvancedDecryptionSection from "@d2e/components/AdvancedDecryptionSection";
import { AdvancedDecrpytionEngramIdList } from "@d2e/types/AdvancedDecryptionEngram";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      {AdvancedDecrpytionEngramIdList.map((advancedDecryptionEngramId) => {
        return (
          <AdvancedDecryptionSection
            advancedDecryptionEngramId={advancedDecryptionEngramId}
          />
        );
      })}
    </main>
  );
}
