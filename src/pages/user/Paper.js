import { useState } from "react";
import * as CF from "../../config/function";


const Paper = () => {
    const [list, setList] = useState([
        {
            tit:"Change in Stromal Thickness and Anterior Curvature After Refractive Corneal Lenticule Extraction with the CLEAR Applicaion",
            txt:"Journal of Refractive Surgery",
            year:"2022",
            month:"12.01",
            file:"paper_file_2022_2.pdf"
        },
        {
            tit:"Refractive Corneal Lenticule Extraction on Previous Photorefractive Keratectomy, with Optical Coherence Tomography Study",
            txt:"Case Report in Ophthalmology",
            year:"2022",
            month:"10.27",
            file:"paper_file_2022_1.pdf"
        },
        {
            tit:"Ex‑vivo study on the surface quality of corneal lenticule and stroma after low energy femtosecond laser lenticule extraction",
            txt:"Scientific reports",
            year:"2005",
            month:"07.14",
            file:"paper_file_2005_1.pdf"
        },
        {
            tit:"Corneal  lenticule  extraction  assisted  by a  low-energy  femtosecond  laser",
            txt:"Wolters Kluwer Health, Inc. ",
            year:"2020",
            month:"04.20",
            file:"paper_file_2020_1.pdf"
        },
        {
            tit:"First Experience in Small Incision Lenticule Extraction with the Femto LDV Z8 and Lenticule Evaluation Using ScanniElectron Microscopyng ",
            txt:"Hindawi Journal of Ophthalmology",
            year:"2020",
            month:"06.26",
            file:"paper_file_2020_2.pdf"
        },
        {
            tit:"CLEAR-Lenticule Extraction ",
            txt:"Cataract & Refractive Surgery Today / Europe Edition",
            year:"2023",
            month:"01 / 02",
            file:"paper_file_2023_1.pdf"
        },
        {
            tit:"Surgical outcomes with high and low pulse energy femtosecond laser systems for cataract surgery",
            txt:"Scientific reports",
            year:"2021",
            month:"05.04",
            file:"paper_file_2021_1.pdf"
        },
    ]);


    //파일다운로드
    const fileDownHandler = (fileName) => {
        const filePath = require(`../../images/paper/${fileName}`);

        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('File download failed', error));
    };

    return(<>
        <div className="list_board_wrap">
            <div className="board_util">
                <em className="txt_total">전체 <b>{CF.MakeIntComma(list.length)}건</b></em>
            </div>
            <ul className="list_magazine">
                {list.map((cont,i)=>{
                    return(
                        <li key={i} onClick={()=>fileDownHandler(cont.file)}>
                            <div className="item_box">
                                <div className="item_date">
                                    <b>{cont.year}</b>
                                    <span>{cont.month}</span>
                                </div>
                                <div className="item_txt">
                                    <div className="item_link">
                                        <strong>{cont.tit}</strong>
                                        <em>{cont.txt}</em>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    </>);
};

export default Paper;