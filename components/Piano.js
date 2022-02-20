

export default function Piano({currentNotes}) {
    return (
        <div id="p-wrapper" style={{position: "absolute", left: 0, height: 250}}>
            <ul id="piano" style={{padding: 10}}>
                <li>
                    <div className="anchor" id="1w" style={{backgroundColor: currentNotes.includes(21) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="2w" style={{backgroundColor: currentNotes.includes(23) ? "lightgreen" : ""}}></div>
                    <span id="1b" style={{backgroundColor: currentNotes.includes(22) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="3w" style={{backgroundColor: currentNotes.includes(24) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="4w" style={{backgroundColor: currentNotes.includes(26) ? "lightgreen" : ""}}></div>
                    <span id="3b" style={{backgroundColor: currentNotes.includes(25) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="5w" style={{backgroundColor: currentNotes.includes(28) ? "lightgreen" : ""}}></div>
                    <span id="4b" style={{backgroundColor: currentNotes.includes(27) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="5w" style={{backgroundColor: currentNotes.includes(29) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="7w" style={{backgroundColor: currentNotes.includes(31) ? "lightgreen" : ""}}></div>
                    <span id="6b" style={{backgroundColor: currentNotes.includes(30) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="8w" style={{backgroundColor: currentNotes.includes(33) ? "lightgreen" : ""}}></div>
                    <span id="7b" style={{backgroundColor: currentNotes.includes(32) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="9w" style={{backgroundColor: currentNotes.includes(35) ? "lightgreen" : ""}}></div>
                    <span id="8b" style={{backgroundColor: currentNotes.includes(34) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="10w" style={{backgroundColor: currentNotes.includes(36) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="11w" style={{backgroundColor: currentNotes.includes(38) ? "lightgreen" : ""}}></div>
                    <span id="10b" style={{backgroundColor: currentNotes.includes(37) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="12w" style={{backgroundColor: currentNotes.includes(40) ? "lightgreen" : ""}}></div>
                    <span id="11b" style={{backgroundColor: currentNotes.includes(39) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="13w" style={{backgroundColor: currentNotes.includes(41) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="14w" style={{backgroundColor: currentNotes.includes(43) ? "lightgreen" : ""}}></div>
                    <span id="13b" style={{backgroundColor: currentNotes.includes(42) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="15w" style={{backgroundColor: currentNotes.includes(45) ? "lightgreen" : ""}}></div>
                    <span id="14b" style={{backgroundColor: currentNotes.includes(44) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="16w" style={{backgroundColor: currentNotes.includes(47) ? "lightgreen" : ""}}></div>
                    <span id="15b" style={{backgroundColor: currentNotes.includes(46) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="17w" style={{backgroundColor: currentNotes.includes(48) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="18w" style={{backgroundColor: currentNotes.includes(50) ? "lightgreen" : ""}}></div>
                    <span id="17b" style={{backgroundColor: currentNotes.includes(49) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="19w" style={{backgroundColor: currentNotes.includes(52) ? "lightgreen" : ""}}></div>
                    <span id="18b" style={{backgroundColor: currentNotes.includes(51) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="20w" style={{backgroundColor: currentNotes.includes(53) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="21w" style={{backgroundColor: currentNotes.includes(55) ? "lightgreen" : ""}}></div>
                    <span id="20b" style={{backgroundColor: currentNotes.includes(54) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="22w" style={{backgroundColor: currentNotes.includes(57) ? "lightgreen" : ""}}></div>
                    <span id="21b" style={{backgroundColor: currentNotes.includes(56) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="23w" style={{backgroundColor: currentNotes.includes(59) ? "lightgreen" : ""}}></div>
                    <span id="22b" style={{backgroundColor: currentNotes.includes(58) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="24w" style={{backgroundColor: currentNotes.includes(60) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="25w" style={{backgroundColor: currentNotes.includes(62) ? "lightgreen" : ""}}></div>
                    <span id="24b" style={{backgroundColor: currentNotes.includes(61) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="26w" style={{backgroundColor: currentNotes.includes(64) ? "lightgreen" : ""}}></div>
                    <span id="25b" style={{backgroundColor: currentNotes.includes(63) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="27w" style={{backgroundColor: currentNotes.includes(65) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="28w" style={{backgroundColor: currentNotes.includes(67) ? "lightgreen" : ""}}></div>
                    <span id="27b" style={{backgroundColor: currentNotes.includes(66) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="29w" style={{backgroundColor: currentNotes.includes(69) ? "lightgreen" : ""}}></div>
                    <span id="28b" style={{backgroundColor: currentNotes.includes(68) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="30w" style={{backgroundColor: currentNotes.includes(71) ? "lightgreen" : ""}}></div>
                    <span id="29b" style={{backgroundColor: currentNotes.includes(70) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="31w" style={{backgroundColor: currentNotes.includes(72) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="32w" style={{backgroundColor: currentNotes.includes(74) ? "lightgreen" : ""}}></div>
                    <span id="31b" style={{backgroundColor: currentNotes.includes(73) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="33w" style={{backgroundColor: currentNotes.includes(76) ? "lightgreen" : ""}}></div>
                    <span id="32b" style={{backgroundColor: currentNotes.includes(75) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="34w" style={{backgroundColor: currentNotes.includes(77) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="35w" style={{backgroundColor: currentNotes.includes(79) ? "lightgreen" : ""}}></div>
                    <span id="34b" style={{backgroundColor: currentNotes.includes(78) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="36w" style={{backgroundColor: currentNotes.includes(81) ? "lightgreen" : ""}}></div>
                    <span id="35b" style={{backgroundColor: currentNotes.includes(80) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="37w" style={{backgroundColor: currentNotes.includes(83) ? "lightgreen" : ""}}></div>
                    <span id="36b" style={{backgroundColor: currentNotes.includes(82) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="38w" style={{backgroundColor: currentNotes.includes(84) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="39w" style={{backgroundColor: currentNotes.includes(86) ? "lightgreen" : ""}}></div>
                    <span id="38b" style={{backgroundColor: currentNotes.includes(85) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="40w" style={{backgroundColor: currentNotes.includes(88) ? "lightgreen" : ""}}></div>
                    <span id="39b" style={{backgroundColor: currentNotes.includes(87) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="41w" style={{backgroundColor: currentNotes.includes(89) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="42w" style={{backgroundColor: currentNotes.includes(91) ? "lightgreen" : ""}}></div>
                    <span id="41b" style={{backgroundColor: currentNotes.includes(90) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="43w" style={{backgroundColor: currentNotes.includes(93) ? "lightgreen" : ""}}></div>
                    <span id="42b" style={{backgroundColor: currentNotes.includes(92) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="44w" style={{backgroundColor: currentNotes.includes(95) ? "lightgreen" : ""}}></div>
                    <span id="43b" style={{backgroundColor: currentNotes.includes(94) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="45w" style={{backgroundColor: currentNotes.includes(96) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="46w" style={{backgroundColor: currentNotes.includes(98) ? "lightgreen" : ""}}></div>
                    <span id="45b" style={{backgroundColor: currentNotes.includes(97) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="47w" style={{backgroundColor: currentNotes.includes(100) ? "lightgreen" : ""}}></div>
                    <span id="46b" style={{backgroundColor: currentNotes.includes(99) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="48w" style={{backgroundColor: currentNotes.includes(101) ? "lightgreen" : ""}}></div>
                </li>
                <li>
                    <div className="anchor" id="49w" style={{backgroundColor: currentNotes.includes(103) ? "lightgreen" : ""}}></div>
                    <span id="48b" style={{backgroundColor: currentNotes.includes(102) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="50w" style={{backgroundColor: currentNotes.includes(105) ? "lightgreen" : ""}}></div>
                    <span id="49b" style={{backgroundColor: currentNotes.includes(104) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="51w" style={{backgroundColor: currentNotes.includes(107) ? "lightgreen" : ""}}></div>
                    <span id="50b" style={{backgroundColor: currentNotes.includes(106) ? "lightblue" : ""}}></span></li>
                <li>
                    <div className="anchor" id="52w" style={{backgroundColor: currentNotes.includes(108) ? "lightgreen" : ""}}></div>
                </li>
            </ul>
        </div>
    )
}