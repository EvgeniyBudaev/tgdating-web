"use client";

import { type FC, memo } from "react";
import { Container } from "@/app/shared/components/container";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { ButtonLink } from "@/app/uikit/components/button/buttonLink";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./AgreementPage.scss";

type TProps = {
  lng: ELanguage;
};

const AgreementPageComponent: FC<TProps> = ({ lng }) => {
  return (
    <section className="AgreementPage">
      <Container>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB1Bold}>
            USER AGREEMENT
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            INTRODUCTION
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            This User Agreement (“Agreement”) provides for the use of the
            Telegram bot @wefatebot (“Service”, “Bot”, “We”) by the user
            (“User”, “Client”, “You”).
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Before using the Service, you agree that you have read and accepted
            all of the terms and conditions contained in this Agreement and in
            our Privacy Policy available on @wefatebot.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            By starting to use the Service or its individual functions, the User
            is deemed to have accepted the terms of the Agreement in full,
            without any reservations and exceptions.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The terms of this Agreement are applied to all users and other
            persons who access or use the Service. If you do not agree to accept
            and comply with any of the terms of this Agreement, or if the
            Agreement contradicts the laws of your country or the laws of your
            location, you shall agree not to use @wefatebot. If you fail to do
            so, you shall be liable for all losses and damages caused to the bot
            or third parties as a result of your refusal.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Service may from time to time, at its discretion, make changes
            and improvements to this Agreement.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            By continuing to use the Service after these changes have been made,
            you are deemed to have signified and agreed to the changes.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The service is based on the algorithms of the Telegram application,
            so please also refer to the Telegram Terms of Use and Privacy
            Policy.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            SERVICES PROVIDED
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Bot provides dating and communication services: the Bot provides
            the opportunity to create profiles that can be seen by other users
            and liked or disliked by them. Mutual liking of profiles results in
            the exchange of Telegram contact details for further communication.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            To ensure safety and a tailored user experience, the Bot segregates
            profiles of users under 18 years old (minors) from those of adult
            users. This isolation minimizes interactions between minors and
            adults and enhances the safety of the environment for younger users.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            TERMS OF USE
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            To be eligible to use the Service, you represent and warrant that:
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1. You are an individual of full legal capacity and physical ability
            and have sufficient authority to agree to this document.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            2. You do not provide us with misleading, false, or fraudulent
            information.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            3. You have not previously been banned or restricted from using our
            Service.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            4. You do not violate any of the provisions of this Agreement or
            applicable laws and regulations.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            5. You are responsible for compliance with the relevant laws in the
            territory of your residence (registration) from which you are
            accessing @wefatebot.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            6. Users under the age of 18 must obtain explicit consent from their
            legal representatives before using the Service. By continuing to use
            the Service, minors confirm that such consent has been provided. The
            Service is not liable for any use by minors without such consent.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Service recommends using the Bot to persons over the age of 18.
            Minors may only use the Bot to find friends or engage in
            non-romantic communication, provided they have obtained permission
            from their legal representatives.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            To enhance safety, the Bot ensures that minors' profiles are not
            displayed to adult users, and vice versa. This separation is a
            critical measure to prevent unwanted or inappropriate interactions.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Service reserves the right to restrict or prohibit the use of
            the Bot in certain jurisdictions, if required by applicable law.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            You also warrant that you do not misuse the Service or attempt to
            disrupt or otherwise interfere with it, for example, do not use the
            Bot for fraudulent or misleading actions, introducing malware,
            hacking, spreading spam, or circumventing our systems or security
            measures.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            You can also notify @wefatebot if you wish to stop accessing the Bot
            at any time by sending a support request.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            REGISTRATION PROCEDURE AND USE OF THE BOT
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Registration procedure.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Sending a request.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            To start using @wefatebot, you must activate the bot and provide
            @wefatebot with the data required to create the profile of the Bot’s
            user. The data includes: nickname, gender, age, orientation, the
            city where you plan to get acquainted, the language, the photo/video
            provided by the user.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The user can also add a description of their interests, hobbies, and
            other information in the profile.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            User verification and monitoring.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            We reserve the right to restrict or block your access to @wefatebot
            and to postpone the registration if we detect a risk of fraud or any
            other illegal activity.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            We may also require you to provide additional information or wait
            some time after you have completed providing the data before
            allowing you to use the services. Video-verification may be
            requested for high-risk profiles to confirm authenticity. The
            criteria for identifying high-risk profiles are internal and not
            subject to disclosure.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            By accessing the services provided by @wefatebot partners through
            the Bot, you give your consent to the transfer of your data to the
            Bot’s partners and understand that @wefatebot has the right to
            restrict your access to the Service and additional services based on
            information received from its partners.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Using the chatbot.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            After completing the profile creation process, you have the
            opportunity to view the profiles of other users. In order to get
            acquainted with the profiles of other users, you need to select
            "View profiles".
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Choose an item in the form of a "heart" if you want to get to know
            the user. In case of unwillingness to further acquaintance, choose
            an item in the form of an "cancel", then the following profile will
            be displayed to you.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If you have selected an item in the form of a "heart", then the
            person in respect of whom you have selected this item will receive a
            notification of your choice. If this person also chooses this item,
            then you will receive a link to his Telegram profile, where you can
            start communicating through the Telegram messenger.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            In the process of viewing the profiles, advertisements placed in
            accordance with the provisions of the legislation may be displayed.
            Advertisers do not have direct access to personal user data.
            Instead, anonymized and aggregated information is used for ad
            targeting.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            PROHIBITED USE OF THE BOT
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            We grant you a non-exclusive, non-transferable license to use
            @wefatebot in accordance with the terms and conditions of this
            Agreement.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            You have the right to access and use the Service and related
            materials and information (collectively referred to as the
            "Content") exclusively in accordance with the terms of this
            Agreement.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Any other use of the Service or Content is strictly prohibited, and
            all other rights, titles to the Service or Content belong
            exclusively to the owner of the @wefatebot, its licensors.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The use of the Service for the purpose of advertising related to
            illegal services, fraudulent schemes, pyramids, darknet, extortion,
            money laundering, terrorist financing, subjects of sanctions
            regimes, and other categories of unacceptable risk for @wefatebot is
            prohibited.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Impersonating another person when registering and using @wefatebot
            is prohibited.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Expressions of a sexual nature or hints of sexual acts against
            persons under the age of 18 do not comply with our terms of service
            and are illegal in many countries. If you are detected in such
            actions, your account will be deleted and information about it will
            be transferred to the local police.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            RESOLUTION OF COMPLAINTS
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If you have any feedback, questions or complaints, please contact
            customer support (@wefatehelp).
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If you have a complaint, please state the reason for your complaint,
            how you would like us to resolve the complaint, and any other
            information that you consider appropriate. We will investigate your
            complaint based on the information you have provided and any
            information provided by @wefatebot.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Your complaint will be considered within 14 (fourteen) calendar days
            from the date of receipt of the complaint by the support service.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Agent from the @wefatebot support team may make the following
            decisions based on your complaint:
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1. Resolve your complaint in accordance with your request.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            2. Make a decision to reject your complaint and indicate the reasons
            for the rejection.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            3. Resolve your complaint in an alternative way.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            You agree to use the complaint procedure described in this section
            before filing a claim with the court. The failure to comply with
            this provision may be used as evidence of your unwillingness to
            settle the issue out of court and/or the unacceptable nature of the
            complaint.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            SUSPENSION AND TERMINATION OF ACCESS TO THE BOT
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            @wefatebot may restrict or terminate your access to the Service if
            required by a valid subpoena, court order or mandatory order of a
            government agency,
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            and/or we reasonably suspect the User of prohibited use of
            @wefatebot;
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            and/or the use of your profile is the subject of any legal
            proceedings, investigations or government proceedings;
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            and/or we believe there is an increased risk of non-compliance with
            legal or regulatory requirements regarding your use of @wefatebot;
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            and/or our service partners cannot support your use of the Service;
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            and/or you take actions that, in our sole discretion, circumvent the
            rules and controls we have established, including, but not limited
            to, opening multiple profiles or abusing promotions that @wefatebot
            may offer from time to time;
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            or you are violating this Agreement and other @wefatebot rules.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            THIRD PARTY CONTENT
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If during the use of the Bot, the user profiles contain (or may
            contain) links to sites on the Internet (third-party sites) as well
            as articles, photographs, illustrations, graphic images, music,
            sounds, videos, information, applications, programs, and other
            content belonging to or originating from third parties (Third Party
            Content). These third parties and their content are not verified by
            the Service for compliance with any particular requirements (e.g.,
            accuracy, completeness, legality, etc.). The Service is not
            responsible for any information posted on third-party sites that
            users access via links in user profiles or Third Party Content.
            Users interact with Third Party Content at their own discretion and
            risk.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If any Third Party Content violates your rights or appears to be
            unlawful, you may contact the Service for review and potential
            action, but the final responsibility lies with the creator or owner
            of the Third Party Content.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            COOPERATION WITH LAW ENFORCEMENT AGENCIES
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Service cooperates with law enforcement agencies and other
            authorized organizations strictly within the framework of applicable
            laws and regulations. Requests for user data or other information
            must comply with the following requirements:
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>1. Submission of Requests:</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1.1 Requests must be sent from an official email address belonging
            to the requesting law enforcement agency to the designated email:
            budaev.e@gmail.com
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1.2 The request must include the name and position of the requesting
            officer, the purpose and scope of the request, and relevant
            documentation, such as a court order or other legal authorization.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1.3 The email must also provide a Telegram contact for prompt
            communication with the requesting officer, if needed.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>2. Verification of Requests:</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            2.1 The Service reserves the right to verify the authenticity of the
            request by contacting the requesting agency through publicly
            available official channels.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            2.2 Requests that fail to meet these requirements may be delayed or
            rejected.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>3. Limitations on Data Disclosure:</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            3.1 The Service will disclose only the minimum amount of data
            necessary to fulfill the legal request.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            3.2 Where permissible by law and in the absence of a confidentiality
            order, the Service may notify the user whose data is being
            requested.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>4. Emergency Situations:</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            4.1 In urgent cases involving imminent harm or threats to public
            safety, the Service may expedite processing of requests. Such
            requests must still be formally submitted and justified.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            FINAL PROVISIONS
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The meanings of terms used in this Agreement are determined in
            accordance with the laws of the relevant jurisdiction, unless
            explicitly stated otherwise. If any provision of this Agreement is
            found to be invalid or unenforceable, this will not affect the
            validity or enforceability of the remaining provisions.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Users under the age of 18 are required to inform their legal
            representatives about their registration and use of the Service. The
            Service does not assume responsibility for ensuring that such
            notification is provided.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The responsibility for the actions of minors using the Service lies
            entirely with their legal representatives. By registering or
            allowing a minor to use the Service, legal representatives confirm
            their consent to this Agreement and take full responsibility for
            ensuring compliance with its terms.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Service reserves the right to assign or transfer its rights and
            obligations under this Agreement to a third party without prior
            notice, provided that such assignment does not adversely affect the
            rights of the User.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            By accepting this Agreement, you agree that all communications,
            notices, and agreements will be delivered electronically where
            legally permissible.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            This Agreement constitutes the entire understanding between the
            parties concerning the use of the Service and supersedes all prior
            agreements or understandings, whether written or oral, relating to
            its subject matter.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If you have any questions or concerns about this Agreement, please
            contact us at @wafatehelp.
          </Typography>
        </div>
        <div className="AgreementPage-Control">
          <ButtonLink
            className="AgreementPage-Button"
            href={createPath({
              route: ERoutes.Started,
              lng,
            })}
          >
            <Typography>OK</Typography>
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
};

export const AgreementPage = memo(AgreementPageComponent);
