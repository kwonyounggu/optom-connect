import React, {useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function DisplayAllPages (props)
{
	const [numPages, setNumPages] = useState(0);
	
	function onDocumentLoadSuccess ({numPages})
	{
		setNumPages(numPages);
	}
		
	return (
			<Document file={props.src} 
					  onLoadSuccess={onDocumentLoadSuccess}
			>
				{
					Array.from
					(
						new Array(numPages), (el, index) => (<Page key={`page_${index+1}`} pageNumber={index+1} />)
					)
				}
			</Document>
		   );
}