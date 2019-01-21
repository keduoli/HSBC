import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import {HomePage,UserManagePage,SpecialCheckPage,LoanManagePage,ContractManagePage,WaitOpenPage,ApplyOpenPage,ApplyRecordPage,CollectionPage,HeadOpeningPage,CodeOpeningPage,MessagePage,TurnOutTaxPage,PrintPage,SaleSettingPage,InvoiceStockPage,GoodsManagePage,InvoicesQueryPage,EleOpeningPage,PapOpeningPage,ImportCheckPage,WhiteListPage,ExportSettingPage,ManagerPage,FrameworkPage,PollingPage,APISettingPage,ExpenseSettingsPage,TaxformPage,ResultPage,DeductionPage,InvoicePage,ChangePasswordPage,RecordPage,OcrPage,ActionLogPage,ScanPage,SuccessivePage,UploadPage,BlackListPage, GroupModelPage} from 'containers'
import { CompanyPage,DepartmentPage } from 'components'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute to="/home" component={HomePage} />

    <Route path="/home" component={HomePage} />
    <Route path="/scan" component={ScanPage} />
    <Route path="/invoice" component={InvoicePage} />
    <Route path="/company" component={CompanyPage} />
    <Route path="/department" component={DepartmentPage} />
    <Route path="/record" component={RecordPage} />
    <Route path="/continuousscan" component={SuccessivePage} />
    <Route path="/ocr" component={OcrPage} />
    <Route path="/changepassword" component={ChangePasswordPage} />
    <Route path="/log" component={ActionLogPage} />
    <Route path="/upload" component={UploadPage} />
    <Route path="/blacklist" component={BlackListPage} />
    <Route path="/consortium" component={GroupModelPage} />
    <Route path="/apisetting" component={APISettingPage} />
    <Route path="/deduction" component={DeductionPage} />
    <Route path="/result" component={ResultPage} />
    <Route path="/taxform" component={TaxformPage} />
    <Route path="/expensesettings" component={ExpenseSettingsPage} />
    <Route path="/polling" component={PollingPage} />
    <Route path="/manager" component={ManagerPage} />
    <Route path="/framework" component={FrameworkPage} />
    <Route path="/whitelist" component={WhiteListPage} />
    <Route path="/invoicesetting" component={ExportSettingPage} />
    <Route path="/import" component={ImportCheckPage} />
    <Route path="/turnouttax" component={TurnOutTaxPage} />

    {/*私有化*/}
    <Route path="/customer" component={UserManagePage} />
    <Route path="/drawdown" component={LoanManagePage} />
    <Route path="/contract" component={ContractManagePage} />
    <Route path="/recordonly" component={SpecialCheckPage} />

  </Route>
);


export default routes
