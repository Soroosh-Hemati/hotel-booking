import React, { useRef, useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi'
import useOutsideClick from '../../hooks/useOutsideClick';

function Header() {
    const [destination, setDestination] = useState('')
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation == 'inc' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    return (
        <div className='header'>
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className='headerIcon locationIcon' />
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder='Where to go?'
                        className='headerSearchInput'
                        name='destination'
                        id='destination' />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className='headerIcon dateIcon' />
                    <div className="dateDropDown">2023/06/21</div>
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
                        {options.adult} adult &bull; {options.children} children &bull; {options.room} room
                    </div>
                    {openOptions && <GuestOptionsList options={options} handleOption={handleOption} setOpenOptions={setOpenOptions} />}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn">
                        <HiSearch className='headerIcon' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header

function GuestOptionsList({ options, handleOption, setOpenOptions }) {
    const optionsRef = useRef();
    useOutsideClick(optionsRef, 'optionDropDown', () => { setOpenOptions(false) })
    return <div className="guestOptions" ref={optionsRef}>
        <GuestOptionItem type='adult' options={options} minLimit={1} handleOption={handleOption} />
        <GuestOptionItem type="children" options={options} minLimit={0} handleOption={handleOption} />
        <GuestOptionItem type="room" options={options} minLimit={1} handleOption={handleOption} />
    </div>
}
function GuestOptionItem({ options, type, minLimit, handleOption }) {
    return <div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
            <button className='optionCounterBtn' disabled={options[type] <= minLimit} onClick={() => handleOption(type, 'dec')}>
                <HiMinus className='icon' /></button>
            <span className="optionCounterNumber">{options[type]}</span>
            <button className='optionCounterBtn' onClick={() => handleOption(type, 'inc')}>
                <HiPlus className='icon' /></button>
        </div>
    </div>
}