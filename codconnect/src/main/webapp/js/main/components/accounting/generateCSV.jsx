export function generateRA(report, currency)
{
	var csvData =
		[
			["PAYEE NAME:", report.hr1.title + ". " + report.hr1.initials + " " + report.hr1.lastName, "HEALTH CARE PROVIDER:", report.hr1.healthCareProvider],
			["GROUP NUMBER:", (report.hr1.groupNumber === "0000" ? " N/A" : report.hr1.groupNumber), "PAYMENT DATE: ", report.hr1.paymentDate],
			["PAYMENT METHOD:", report.hr1.chequeNumber === "99999999" ? "Direcct Deposit" : (report.hr1.chequeNumber.length == 0 ? "Pay Patient" : report.hr1.chequeNumber), "TOTAL AMOUNT:", currency.format(report.hr1.totalAmountPayable)],
			["RA SEQUENCE:", report.hr1.remittanceAdviceSequence, "SPECIALITY:", report.hr1.speciality],
			["BILLING AGENT:", report.hr2.addressLineOne, report.hr3.addressLineTwo, report.hr3.addressLineThree],
			[" ", " ", " ", " "],
			["ACCOUNTING NUMBER", "CLAIM NUMBER", "REGISTRATION NUMBER", "HEALTH CARE PROVIDER", "PAYMENT RPOGRAM", "PROVICE CODE", "SPECIALITY", "TX TYPE", "VSN CODE", "EXP CODE", "SVC DATE", "NO.OF SVC", "SVC CODE", "AMT SUBMITTED", "AMT PAID"]
		];

		report.hr45.forEach
		(
			(element) =>
			{
				let item = [element.accountingNumber,
							element.claimNumber,
							element.healthRegistrationNumber,
							element.healthcareProvider,
							element.paymentProgram,
							element.provinceCode,
							element.speciality,
							element.transactionType,
							element.versionCode,
							element.explanatoryCode,
							element.serviceDate,
							element.numberOfServices,
							element.serviceCode,
							currency.format(element.amountSubmitted),
							currency.format(element.amountPaid)
							];
				csvData.push(item);
			}
		);
		
		if (report.hr6)
		{
			csvData.push([" "]);
			csvData.push(["Balance Forward Record"]);
			csvData.push(["Amount Brought Forward – Claims Adjustment: ", currency.format(report.hr6.amtBrtFwdClaimsAdjustment)]);
			csvData.push(["Amount Brought Forward – Advances: ", currency.format(report.hr6.amtBrtFwdClaimsAdvances)]);
			csvData.push(["Amount Brought Forward – Reductions: ", currency.format(report.hr6.amtBrtFwdReductions)]);
			csvData.push(["Amount Brought Forward – Other Deductions: ", currency.format(report.hr6.amtBrtFwdOtherDeductions)]);
		}
		
		if (report.hr7)
		{
			csvData.push([" "]);
			csvData.push(["Accounting Transaction Record"]);
			csvData.push(["Transaction Code[" + report.hr7.txCodeOrg +"]: ", report.hr7.transactionCode]);
			//csvData.push(["Cheque Indicator[" + report.hr7.ciOrg +"]: ", report.hr7.chequeIndicator]);
			csvData.push(["Transaction Date: ", report.hr7.transactionDate]);
			csvData.push(["Transaction Amount: ", currency.format(report.hr7.transactionAmount)]);
			csvData.push(["Transaction Message: ", report.hr7.transactionMessage]);
		}
		
		if (report.hr8)
		{
			csvData.push([" "]);
			csvData.push(["Message Facility Record"]);
			report.hr8.forEach
			(
				(element) =>
				{
					if (element.messageText.startsWith("*")) csvData.push([" "]);
					else csvData.push([element.messageText]);
				}
			);
		}
	return csvData;
}