import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function FaqNav({ faqObject }) {
    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            <div className='main-faq-topic d-flex flex-row border-0 p-3 justify-content-between' onClick={() => setDropdown(!dropdown)}>
                <h6 className='border-bottom-1 text-dark font-weight-bold'>
                    <FontAwesomeIcon icon={faqObject.icon} /> &nbsp; {faqObject.title}
                </h6>
                <div>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            {dropdown && <div className='ps-5' style={{ "textAlign": "left" }}>
                {faqObject.subTitles.map(subTitle => <div>{subTitle}</div>)}
            </div>}

        </>
    )
}

export default FaqNav