import React from "react";
import Layout from "../components/layout";

const Home = (props: any) => (
  <Layout>
    <h1>ИНФО-БАНК in TypeScript!!!</h1>
    <ul>
      <li>
        «ИНФО-Банк» - это сервис, разработанный специально для клиентов
        Русфинанс Банка. Он призван повысить наш уровень клиентского сервиса,
        чтобы ваши операции по кредитам стали максимально доступными.
        Регистрируйтесь и получайте актуальную информацию по всем кредитным
        договорам, а также действующим индивидуальным предложениям.
      </li>
      <li>
        Теперь для основной части наших лояльных клиентов, для которых Банк
        подготовил индивидуальное предложение доступна онлайн заявка на кредит
        наличными. Расчет параметров кредита и предварительное решение доступны
        прямо в ИНФО-Банке с рекордной скоростью!
      </li>
      <li>Для доступа в систему вам необходимо зарегистрироваться.</li>
      <li>
        Обращаем ваше внимание, что для клиентов, оформивших займ в компании
        «Русфинанс», услуга «ИНФО-Банк» не предоставляется.
      </li>
    </ul>
    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
);

export default Home;