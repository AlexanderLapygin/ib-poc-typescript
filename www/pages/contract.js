import Layout from '../components/layout'
import service from "../utils/service"

const Contract = props => {
  const { contract_type, contract_number, credit_date, credit_sum } = props[0]

  return (
    <Layout>
      <h1>Договор</h1>
      <table>
        <tbody>
          <tr>
            <td width="300">Тип кредита</td>
            <td><b>{contract_type}</b></td>
          </tr>
          <tr>
            <td>Номер договора</td>
            <td><b>{contract_number}</b></td>
          </tr>
          <tr>
            <td>Дата оформления кредита</td>
            <td><b>{credit_date}</b></td>
          </tr>
          <tr>
            <td>Сумма кредита</td>
            <td><b>{credit_sum}</b></td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        img {
          max-width: 200px;
          border-radius: 0.5rem;
        }

        h1 {
          margin-bottom: 0;
        }

        .lead {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
          color: #666;
        }

        p {
          color: #6a737d;
        }
      `}</style>
    </Layout>
  )
}

Contract.getInitialProps = async ctx => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/api/contract`
    : `${protocol}://${ctx.req.headers.host}/api/contract`

    return service({url: apiUrl, ctx});
}

export default Contract
