import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.legal.termsTitle };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const isKo = lang === "ko";

  return (
    <>
      <PageHero eyebrow="LEGAL" title={dict.legal.termsTitle} />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <LegalPlaceholder dict={dict} />
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-fg-muted">
            {(isKo
              ? [
                  ["제1조 (목적)", "본 약관은 ARIS GAMES(이하 '회사')가 제공하는 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다."],
                  ["제2조 (효력 및 변경)", "실제 서비스 제공 시점에 맞추어 정식 약관으로 대체되며, 관련 법령에 따라 개정될 수 있습니다."],
                  ["제3조 (서비스의 제공)", "회사가 제공하는 게임 및 부가 서비스의 내용은 각 서비스 출시 시점에 구체적으로 안내합니다."],
                  ["제4조 (이용자의 의무)", "이용자가 준수해야 할 사항은 서비스 정식 오픈 전 구체적으로 마련하여 고지합니다."],
                  ["제5조 (면책조항)", "천재지변 등 불가항력적 사유에 대한 회사의 책임 범위를 규정할 예정입니다."],
                ]
              : [
                  ["Article 1 (Purpose)", "These terms will govern the rights, obligations, and responsibilities between ARIS GAMES ('the Company') and users of its services."],
                  ["Article 2 (Effect & Changes)", "This draft will be replaced with the final terms once services officially launch, and may be revised in line with applicable law."],
                  ["Article 3 (Provision of Service)", "Details of games and related services will be announced at the time each is released."],
                  ["Article 4 (User Obligations)", "User obligations will be defined and published before official launch."],
                  ["Article 5 (Limitation of Liability)", "The scope of the Company's liability for force majeure and similar events will be defined here."],
                ]
            ).map(([title, body]) => (
              <div key={title}>
                <h2 className="text-base font-bold text-fg">{title}</h2>
                <p className="mt-2">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
