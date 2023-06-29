import AdvancedDecryptionSection from "@d2e/components/AdvancedDecryptionSection";
import { AdvancedDecrpytionEngramIdList } from "@d2e/types/AdvancedDecryptionEngram";

export default function AdvancedDecryptionPage() {
  return (
    <div>
      {AdvancedDecrpytionEngramIdList.map((advancedDecryptionEngramId) => (
        <AdvancedDecryptionSection
          key={advancedDecryptionEngramId}
          advancedDecryptionEngramId={advancedDecryptionEngramId}
        />
      ))}
    </div>
  );
}
