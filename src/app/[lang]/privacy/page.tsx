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
  return { title: dict.legal.privacyTitle };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const isKo = lang === "ko";

  return (
    <>
      <PageHero eyebrow="LEGAL" title={dict.legal.privacyTitle} />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <LegalPlaceholder dict={dict} />
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-fg-muted">
            {(isKo
              ? [
                  ["1. 수집하는 개인정보 항목", "서비스 및 문의 채널이 정식으로 운영되면, 수집하는 개인정보의 항목을 이곳에 구체적으로 명시합니다."],
                  ["2. 개인정보의 수집 및 이용 목적", "회원 관리, 서비스 제공, 문의 응대 등 실제 목적이 확정되는 대로 반영합니다."],
                  ["3. 개인정보의 보유 및 이용 기간", "관련 법령 및 회사 내부 방침에 따른 보유 기간을 명시할 예정입니다."],
                  ["4. 개인정보의 제3자 제공", "제3자 제공이 발생하는 경우 그 대상과 목적을 구체적으로 안내합니다."],
                  ["5. 이용자의 권리와 행사 방법", "열람, 정정, 삭제, 처리정지 등 이용자의 권리 행사 방법을 안내합니다."],
                  ["6. 개인정보 보호책임자", "담당 부서 및 연락처 정보가 확정되면 이곳에 게시합니다."],
                ]
              : [
                  ["1. Information We Collect", "Once our services and inquiry channels are officially live, this section will list exactly what personal data is collected."],
                  ["2. Purpose of Collection", "Purposes such as account management, service delivery, and support will be detailed once finalized."],
                  ["3. Retention Period", "Retention periods will follow applicable law and internal policy, and will be specified here."],
                  ["4. Third-Party Sharing", "Any third-party sharing will be disclosed with its recipients and purpose."],
                  ["5. Your Rights", "How to access, correct, delete, or restrict processing of your data will be explained here."],
                  ["6. Privacy Officer", "Contact details for our designated privacy officer will be published once confirmed."],
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
