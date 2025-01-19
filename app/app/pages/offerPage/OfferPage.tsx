"use client";

import { useRouter } from "next/navigation";
import { type FC, memo } from "react";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { Button } from "@/app/uikit/components/button";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./OfferPage.scss";

type TProps = {
  lng: ELanguage;
};

const OfferPageComponent: FC<TProps> = ({ lng }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="OfferPage">
      <Container>
        <div className="OfferPage-Title OfferPage-Block">
          <div className="OfferPage-Title-Column">
            <div>
              <Typography variant={ETypographyVariant.TextB1Bold}>
                ПУБЛИЧНАЯ ОФЕРТА
              </Typography>
            </div>
            <div>
              <Typography variant={ETypographyVariant.TextB3Bold}>
                о заключении договора об оказании услуг
              </Typography>
            </div>
          </div>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            1. Общие положения
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            В настоящей Публичной оферте содержатся условия заключения Договора
            об оказании услуг (далее по тексту - «Договор об оказании услуг»
            и/или «Договор»). Настоящей офертой признается предложение,
            адресованное одному или нескольким конкретным лицам, которое
            достаточно определенно и выражает намерение лица, сделавшего
            предложение, считать себя заключившим Договор с адресатом, которым
            будет принято предложение.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            Совершение указанных в настоящей Оферте действий является
            подтверждением согласия обеих Сторон заключить Договор об оказании
            услуг на условиях, в порядке и объеме, изложенных в настоящей
            Оферте.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            Нижеизложенный текст Публичной оферты является официальным публичным
            предложением Исполнителя, адресованный заинтересованному кругу лиц
            заключить Договор об оказании услуг в соответствии с положениями
            пункта 2 статьи 437 Гражданского кодекса РФ.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            Договор об оказании услуг считается заключенным и приобретает силу с
            момента совершения Сторонами действий, предусмотренных в настоящей
            Оферте, и, означающих безоговорочное, а также полное принятие всех
            условий настоящей Оферты без каких-либо изъятий или ограничений на
            условиях присоединения.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Термины и определения:
            </Typography>
            <br />
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Договор&nbsp;
            </Typography>
            – текст настоящей Оферты с Приложениями, являющимися неотъемлемой
            частью настоящей Оферты, акцептованный Заказчиком путем совершения
            конклюдентных действий, предусмотренных настоящей Офертой.
            <br />
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Конклюдентные действия&nbsp;
            </Typography>
            — это поведение, которое выражает согласие с предложением
            контрагента заключить, изменить или расторгнуть договор. Действия
            состоят в полном или частичном выполнении условий, которые предложил
            контрагент.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Сайт Исполнителя в сети «Интернет»&nbsp;
            </Typography>
            – совокупность программ для электронных вычислительных машин и иной
            информации, содержащейся в информационной системе, доступ к которой
            обеспечивается посредством сети «Интернет» по доменному имени и
            сетевому адресу:
            <br />
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Стороны Договора (Стороны)&nbsp;
            </Typography>
            – Исполнитель и Заказчик.
            <br />
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Услуга&nbsp;
            </Typography>
            – услуга, оказываемая Исполнителем Заказчику в порядке и на
            условиях, установленных настоящей Офертой.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            2. Предмет Договора
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.1 Исполнитель обязуется оказать Заказчику Услуги, а Заказчик
            обязуется оплатить их в размере, порядке и сроки, установленные
            настоящим Договором.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.2 Наименование, количество, порядок и иные условия оказания Услуг
            определяются на основании сведений Исполнителя при оформлении заявки
            Заказчиком, либо устанавливаются на сайте Исполнителя в сети
            «Интернет»
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.3 Исполнитель оказывает Услуги по настоящему Договору лично, либо
            с привлечением третьих лиц, при этом за действия третьих лиц
            Исполнитель отвечает перед Заказчиком как за свои собственные.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.4 Договор заключается путем акцепта настоящей Оферты через
            совершение конклюдентных действий, выраженных в:
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.4.1 действиях, связанных с регистрацией учетной записи на Сайте
            Исполнителя в сети «Интернет» при наличии необходимости регистрации
            учетной записи;
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.4.2 оформлении и направлении Заказчиком заявки в адрес Исполнителя
            для оказания Услуг;
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.4.3 действиях, связанных с оплатой Услуг Заказчиком;
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            2.4.4 действиях, связанных с оказанием Услуг Исполнителем.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            Данный перечень неисчерпывающий, могут быть и другие действия,
            которые ясно выражают намерение лица принять предложение
            контрагента.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            3. Права и обязанности Сторон
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.1{" "}
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Права и обязанности Исполнителя:
            </Typography>
            <br />
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.1.1 Исполнитель обязуется оказать Услуги в соответствии с
            положениями настоящего Договора, в сроки и объеме, указанные в
            настоящем Договоре и (или) в порядке, указанном на Сайте
            Исполнителя.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.1.2 Исполнитель обязуется предоставлять Заказчику доступ к
            разделам Сайта, необходимым для получения информации, согласно
            пункту 2.1. Договора.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.1.3 Исполнитель несет ответственность за хранение и обработку
            персональных данных Заказчика, обеспечивает сохранение
            конфиденциальности этих данных и использует их исключительно для
            качественного оказания Услуг Заказчику.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.1.4 Исполнитель оставляет за собой право изменять сроки (период)
            оказания Услуг и условия настоящей Оферты в одностороннем порядке
            без предварительного уведомления Заказчика, публикуя указанные
            изменения на Сайте Исполнителя в сети «Интернет».
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            При этом новые / измененные условия, указываемые на Сайте, действуют
            только в отношении вновь заключаемых Договоров.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.2{" "}
            <Typography variant={ETypographyVariant.TextB3Bold}>
              Права и обязанности Заказчика:
            </Typography>
            <br />
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.2.1 Заказчик обязан предоставлять достоверную информацию о себе
            при получении соответствующих Услуг.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.2.2 Заказчик обязуется не воспроизводить, не повторять, не
            копировать, не продавать, а также не использовать в каких бы то ни
            было целях информацию и материалы, ставшие ему доступными в связи с
            оказанием Услуг, за исключением личного использования
            непосредственно самим Заказчиком без предоставления в какой-либо
            форме доступа каким-либо третьим лицам.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.2.3 Заказчик обязуется принять Услуги, оказанные Исполнителем;
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.2.4 Заказчик вправе потребовать от Исполнителя вернуть денежные
            средства за неоказанные услуги, некачественно оказанные услуги,
            услуги, оказанные с нарушением сроков оказания, а также, если
            Заказчик решил отказаться от услуг по причинам, не связанным с
            нарушением обязательств со стороны Исполнителя, исключительно по
            основаниям, предусмотренным действующим законодательством Российской
            Федерации.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            3.2.5 Заказчик гарантирует, что все условия Договора ему понятны;
            Заказчик принимает условия без оговорок, а также в полном объеме.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            4. Цена и порядок расчетов
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            4.1 Стоимость услуг Исполнителя, оказываемых Заказчиком и порядок их
            оплаты, определяются на основании сведений Исполнителя при
            оформлении заявки Заказчиком либо устанавливаются на Сайте
            Исполнителя в сети «Интернет».
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            4.2 Все расчеты по Договору производятся в безналичном порядке.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            5. Конфиденциальность и безопасность
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            5.1 При реализации настоящего Договора Стороны обеспечивают
            конфиденциальность и безопасность персональных данных в соответствии
            с актуальной редакцией ФЗ от 27.07.2006 г. № 152-ФЗ «О персональных
            данных» и ФЗ от 27.07.2006 г. № 149-ФЗ «Об информации,
            информационных технологиях и о защите информации».
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            5.2 Стороны обязуются сохранять конфиденциальность информации,
            полученной в ходе исполнения настоящего Договора, и принять все
            возможные меры, чтобы предохранить полученную информацию от
            разглашения.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            5.3 Под конфиденциальной информацией понимается любая информация,
            передаваемая Исполнителем и Заказчиком в процессе реализации
            Договора и подлежащая защите, исключения указаны ниже.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            5.4 Такая информация может содержаться в предоставляемых Исполнителю
            локальных нормативных актах, договорах, письмах, отчетах,
            аналитических материалах, результатах исследований, схемах,
            графиках, спецификациях и других документах, оформленных как на
            бумажных, так и на электронных носителях.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            6. Форс-мажор
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            6.1 Стороны освобождаются от ответственности за неисполнение или
            ненадлежащее исполнение обязательств по Договору, если надлежащее
            исполнение оказалось невозможным вследствие непреодолимой силы, то
            есть чрезвычайных и непредотвратимых при данных условиях
            обстоятельств, под которыми понимаются: запретные действия властей,
            эпидемии, блокада, эмбарго, землетрясения, наводнения, пожары или
            другие стихийные бедствия.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            6.2 В случае наступления этих обстоятельств Сторона обязана в
            течение 30 (Тридцати) рабочих дней уведомить об этом другую Сторону.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            6.3 Документ, выданный уполномоченным государственным органом,
            является достаточным подтверждением наличия и продолжительности
            действия непреодолимой силы.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            6.4 Если обстоятельства непреодолимой силы продолжают действовать
            более 60 (Шестидесяти) рабочих дней, то каждая Сторона вправе
            отказаться от настоящего Договора в одностороннем порядке.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            7. Ответственность Сторон
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            7.1 В случае неисполнения и/или ненадлежащего исполнения своих
            обязательств по Договору, Стороны несут ответственность в
            соответствии с условиями настоящей Оферты.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            7.2 Исполнитель не несет ответственности за неисполнение и/или
            ненадлежащее исполнение обязательств по Договору, если такое
            неисполнение и/или ненадлежащее исполнение произошло по вине
            Заказчика.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            7.3 Сторона, не исполнившая или ненадлежащим образом исполнившая
            обязательства по Договору, обязана возместить другой Стороне
            причиненные такими нарушениями убытки.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            8. Срок действия настоящей Оферты
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            8.1 Оферта вступает в силу с момента размещения на Сайте Исполнителя
            и действует до момента её отзыва Исполнителем.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            8.2 Исполнитель оставляет за собой право внести изменения в условия
            Оферты и/или отозвать Оферту в любой момент по своему усмотрению.
            Сведения об изменении или отзыве Оферты доводятся до Заказчика по
            выбору Исполнителя посредством размещения на сайте Исполнителя в
            сети «Интернет», в Личном кабинете Заказчика, либо путем направления
            соответствующего уведомления на электронный или почтовый адрес,
            указанный Заказчиком при заключении Договора или в ходе его
            исполнения.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            8.3 Договор вступает в силу с момента Акцепта условий Оферты
            Заказчиком и действует до полного исполнения Сторонами обязательств
            по Договору.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            8.4 Изменения, внесенные Исполнителем в Договор и опубликованные на
            сайте в форме актуализированной Оферты, считаются принятыми
            Заказчиком в полном объеме.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            9. Дополнительные условия
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            9.1 Договор, его заключение и исполнение регулируется действующим
            законодательством Российской Федерации. Все вопросы, не
            урегулированные настоящей Офертой или урегулированные не полностью,
            регулируются в соответствии с материальным правом Российской
            Федерации.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            9.2 В случае возникновения спора, который может возникнуть между
            Сторонами в ходе исполнения ими своих обязательств по Договору,
            заключенному на условиях настоящей Оферты, Стороны обязаны
            урегулировать спор мирным путем до начала судебного разбирательства.
            <br />
            Судебное разбирательство осуществляется в соответствии с
            законодательством Российской Федерации.
            <br />
            Споры или разногласия, по которым Стороны не достигли
            договоренности, подлежат разрешению в соответствии с
            законодательством РФ. Досудебный порядок урегулирования спора
            является обязательным.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            9.3 В качестве языка Договора, заключаемого на условиях настоящей
            Оферты, а также языка, используемого при любом взаимодействии Сторон
            (включая ведение переписки, предоставление требований / уведомлений
            / разъяснений, предоставление документов и т. д.), Стороны
            определили русский язык.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            9.4 Все документы, подлежащие предоставлению в соответствии с
            условиями настоящей Оферты, должны быть составлены на русском языке
            либо иметь перевод на русский язык, удостоверенный в установленном
            порядке.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            9.5 Бездействие одной из Сторон в случае нарушения условий настоящей
            Оферты не лишает права заинтересованной Стороны осуществлять защиту
            своих интересов позднее, а также не означает отказа от своих прав в
            случае совершения одной из Сторон подобных либо сходных нарушений в
            будущем.
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>
            9.6 Если на Сайте Исполнителя в сети «Интернет» есть ссылки на
            другие веб-сайты и материалы третьих лиц, такие ссылки размещены
            исключительно в целях информирования, и Исполнитель не имеет
            контроля в отношении содержания таких сайтов или материалов.
            Исполнитель не несет ответственность за любые убытки или ущерб,
            которые могут возникнуть в результате использования таких ссылок.
          </Typography>
        </div>
        <div className="OfferPage-Title OfferPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            10. Реквизиты Исполнителя
          </Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>Полное наименование:</Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>ИНН:</Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>ОГРН/ОГРНИП:</Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>Контактный телефон:</Typography>
        </div>
        <div className="OfferPage-Block">
          <Typography>Контактный e-mail:</Typography>
        </div>
        <div className="OfferPage-Control">
          <Button className="OfferPage-Button" onClick={handleBack}>
            <Typography>OK</Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
};

OfferPageComponent.displayName = "OfferPage";

export const OfferPage = memo(OfferPageComponent);
