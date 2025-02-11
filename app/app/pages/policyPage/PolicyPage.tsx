"use client";

import { useRouter } from "next/navigation";
import { type FC, memo } from "react";
import {useTranslation} from "@/app/i18n/client";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { Button } from "@/app/uikit/components/button";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./PolicyPage.scss";

type TProps = {
  lng: ELanguage;
};

const PolicyPageComponent: FC<TProps> = ({ lng }) => {
  const router = useRouter();
  const { t } = useTranslation("policy");

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="PolicyPage">
      <Container>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB1Bold}>
            {t("page.text.1").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.2").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.3")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.4")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.5")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.6")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.7")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.8")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.9")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.10").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.11")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.12")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.&nbsp;{t("page.text.13")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            2.&nbsp;{t("page.text.14")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.1&nbsp;{t("page.text.15")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.2&nbsp;{t("page.text.16")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            3.&nbsp;{t("page.text.17")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            4.&nbsp;{t("page.text.18")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.19")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.20")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.21").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.22")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            1.&nbsp;{t("page.text.23")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.24")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            2.&nbsp;{t("page.text.25")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.26")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            3.&nbsp;{t("page.text.27")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.28")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            4.&nbsp;{t("page.text.29")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.30")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            5.&nbsp;{t("page.text.31")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.32")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.33")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>1.&nbsp;{t("page.text.34")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.&nbsp;{t("page.text.35")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.&nbsp;{t("page.text.36")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            Please note that it is impossible to guarantee 100% security of
            information. Therefore, we ask you to take measures to protect your
            personal information.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            You agree that the Service Provider is not responsible for any
            information leakage and other losses not caused by our intent or
            gross negligence, including, but not limited to hacker attack, power
            outages or unavoidable technical failure, to the maximum extent
            permitted by law, leakage of user data through his own fault.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            If you suspect that your personal information has been compromised,
            please contact us immediately.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            WAYS OF USING YOUR DATA
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            We use the information we collect about you for the following
            purposes or in the following ways:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1. To provide our services: The service Provider uses the collected
            information to fulfill its obligations concerning you, to provide
            you with information, products and services, to maintain and provide
            better Services, to verify your identity.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2. To comply with the requirements of the law: The service provider
            will use the information in accordance with our legal obligations,
            government requests and reasonable user requests.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>3. For research and development:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.1 The Service Provider actively measures and analyzes data for the
            administration of our Services and for internal operations,
            including troubleshooting, data analysis, testing, research,
            statistical and review purposes, as well as to understand how you
            use and interact with our Services.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.2 This review is being conducted by our operations teams to
            continuously improve our Services and fix user interface issues. In
            addition, the Service Provider uses such information to customize,
            measure and improve our Services, the content and layout of our
            websites, as well as to develop new services.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.3 We constantly monitor information about activities in our
            systems and our communications with users in order to search for and
            quickly fix problems.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4. To communicate with you: Without collecting and processing your
            data to confirm each message, the Service Provider will not be able
            to respond to the requests you send.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            5. To ensure compliance with our terms and conditions: The
            information collected is also used to continuously and actively
            comply with our terms and conditions, including, but not limited to,
            reviewing, investigating and preventing any potentially prohibited
            or illegal activities that may violate the above provisions, or
            disclosing relevant information to a third party in accordance with
            them.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            6. For video verification: Video materials collected as part of
            verification are used to confirm profile authenticity and prevent
            fraudulent activity. In addition, anonymized video data may be
            utilized for analysis, improving security algorithms, and developing
            new features.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            7. For marketing and advertising: The Service Provider may share
            your personal information with our marketing partners for the
            purposes of targeting, modeling and/or analytics, as well as
            marketing and advertising. Advertisers do not have direct access to
            personal user data. Instead, the Service Provider uses anonymized
            and aggregated information to target advertisements effectively
            without compromising user privacy.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            8. For targeted advertising: We may use your personal information,
            such as gender, age, and geographic location, to provide
            personalized advertisements and sponsored content in collaboration
            with our advertising partners.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            9. For other purposes: The Service Provider may disclose your
            personal information for any other purposes for which you give
            additional consent, expressed by signing a written document or
            filling out an electronic form provided by the Service Provider.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            LEGAL BASIS FOR PROCESSING
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            When We process your data, we will rely on one of the following
            legal bases for processing. We may process your data for several
            legitimate reasons, depending on the specific purpose for which we
            use your data.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>1. Execution of the contract:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.1 We may process data if the processing of your data is necessary
            to fulfill our obligations under the User Agreement that We have
            entered into with you.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2. Legal obligation or in the public interest:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.1 We are required to process your data in accordance with legal
            obligations.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.2 The purposes of processing include control over identity
            verification, prevention of money laundering and fraud, risk control
            measures, as well as providing information to a competent authority,
            government agency or law enforcement agency.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>3. Legitimate interests:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.1 If necessary, we may process data if we or the third party have
            a legitimate interest in pursuing commercial and business interests,
            except in cases where such interests overlap with your interests,
            fundamental rights and freedoms.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>4. Your consent:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.1 In certain circumstances, We may request specific permission
            from you to process additional personal information for certain
            purposes.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2 Your data will be processed in this way if you agree to it. If
            the legal basis is the consent you have provided, you can withdraw
            your consent at any time. Revocation of your consent will not affect
            the legality of the data processed prior to revocation.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            WHO RECEIVES YOUR DATA
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            The Service Provider receives your data to fulfill requests and
            provide services, as well as to fulfill our contractual and legal
            obligations.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            We transfer your data to third parties if it is necessary for our
            legitimate business needs, to fulfill requests, provide services
            and/or in accordance with the requirements or permits of the law.
            Third parties in such circumstances:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>1. Service Providers:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.1 The service provider will disclose the data to third-party
            partners and service providers (processors) so that they can process
            it on our behalf, where necessary. These service providers are
            required to provide sufficient guarantees in accordance with the
            Data protection Act (for example, being bound by contractual
            obligations regarding confidentiality and data protection). We will
            only transmit the data they need to provide their services.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>2. Auditors and consultants:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.1 We may disclose data for the purposes and in the context of
            inspections (for example, external inspections, security checks) to
            legal and other consultants to investigate security issues, risks,
            complaints, etc.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3. Regulatory authorities, law enforcement agencies, courts:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.1 The Service Provider may disclose data in accordance with
            applicable laws, regulatory obligations, to respond to requests from
            regulatory authorities, government and law enforcement agencies,
            courts and court orders.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>4. Other persons:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.1 Other recipients may be any natural/legal persons to whom you
            ask to transfer your data (for example, a link, etc.) or give your
            consent to the transfer of data.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2 The Service Provider may also disclose your data in such
            circumstances as:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2.1 In order to protect our rights, safety or property, as well as
            the rights of our customers or third parties/the public. This
            includes sharing information with other companies and organizations
            for the purposes of money laundering, fraud prevention and similar
            risks.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2.2 If We are required to disclose or transfer your data in
            accordance with any legal or regulatory obligations or requests..
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            USER RIGHTS
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>Users have the right to:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1. Access and request details about the information we hold.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2. Request corrections to inaccurate or outdated information.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3. Request the deletion or anonymization of data no longer necessary
            for the stated purposes.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4. Object to processing based on legitimate interests.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            5. Withdraw consent for data processing where applicable.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            RETENTION PERIODS AND DATA PROCESSING
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            All collected data, including but not limited to profile
            information, photos, video materials, and user interactions (e.g.,
            likes and matches), is retained for:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1. The time necessary to provide services and fulfill contractual
            obligations.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2. Compliance with legal and regulatory requirements.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3. Statistical or analytical purposes, provided the data is
            anonymized.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4. Improvement of security algorithms and development of new
            features (anonymized data only).
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            Data may be retained beyond these periods if there are lawful
            grounds, such as ongoing legal obligations or user consent. Upon the
            expiration of retention periods, data will be securely deleted or
            anonymized for continued use in analytics and service improvement.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            RIGHT TO COMPLAIN
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            If you are dissatisfied with the way your personal data has been
            processed or have concerns regarding any privacy-related issue, you
            may contact us at the details provided below. We will investigate
            your complaint and respond within 14 calendar days.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            Before pursuing legal action, you agree to first attempt to resolve
            the complaint directly with the Service Provider using the provided
            contact details.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            CONTACT DETAILS
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            For any privacy-related concerns, please contact:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>Telegram Support: @wefatehelp</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            If your concerns are not addressed to your satisfaction, you may
            file a complaint with the relevant supervisory authority in your
            jurisdiction.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            CHANGES TO THIS POLICY
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            This Privacy Policy may be updated from time to time to reflect
            changes in legal, regulatory, or operational requirements.
            Significant updates will be communicated to users through the
            Telegram bot interface.
          </Typography>
        </div>
        <div className="PolicyPage-Control">
          <Button className="PolicyPage-Button" onClick={handleBack}>
            <Typography>OK</Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
};

PolicyPageComponent.displayName = "PolicyPage";

export const PolicyPage = memo(PolicyPageComponent);
