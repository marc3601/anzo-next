import React, { useState } from 'react'
import Link from "next/link"
import Loupe from '../utilities/Loupe'
import styles from "../styles/Navigation.module.css"
const Navigation = () => {
    const [suggest, setSuggest] = useState(false);
    const [wideBar, setWideBar] = useState(false);
    const [input, setInput] = useState("");
    const [titles, setTitles] = useState([])
    const [filteredTitles, setFiltered] = useState([])

    const fetchDataForAutocomplete = () => {
        const suggestions = []
        fetch("https://doge-memes.com/api/auctions")
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    suggestions.push(element.title)
                });
                setTitles(suggestions)
            })
    }

    const fileterTitlesOnInput = (input) => {
        const filtered = [];
        titles?.forEach(item => {
            const lowerCaseItem = item?.toLowerCase();
            const lowerCaseInput = input.toLowerCase();
            const isPresent = lowerCaseItem?.includes(lowerCaseInput);
            if (isPresent) {
                filtered.push(item)
            }
        })
        return filtered
    }

    return (
        <>
            <div className={styles.navigation_section}>
                <Link href="/">
                    <div className={`${styles.logo} ${wideBar && styles.logo_hide}`}>ANZO</div>
                </Link>
                <div className={`${styles.search_container} ${wideBar && styles.search_container_large}`}>
                    <div className={`${styles.search_wrapper} ${wideBar && styles.search_wrapper_large}`}  >
                        <Loupe />
                        <input
                            value={input}
                            onChange={e => {
                                setInput(e.target.value);
                                setFiltered(fileterTitlesOnInput(input))
                            }}
                            onFocus={() => {
                                if (titles?.length === 0) {
                                    fetchDataForAutocomplete();
                                }
                                if (window.innerWidth <= 576) {
                                    setWideBar(true)
                                }
                                setSuggest(true)
                            }} onBlur={() => {
                                setWideBar(false)
                                setSuggest(false)
                                setInput("");
                                setFiltered([])

                            }} className={styles.search_input} placeholder="Szukaj..." />
                    </div>
                    <div className={`${styles.search_suggest} ${wideBar && styles.search_suggest_large}`}>
                        {suggest && input?.length > 0 && filteredTitles.length > 0 && <ul className={styles.suggestions}>
                            {filteredTitles?.map((item, id) => {
                                if (id < 10) return <li key={id}>{item}</li>
                                return
                            })}
                        </ul>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation
