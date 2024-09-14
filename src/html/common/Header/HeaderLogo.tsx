import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/svg/logos/logo.svg'
import text from '../../../assets/svg/logos/text.svg'

const HeaderLogo = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Link className="header-logo" to="/">
      <img className="logo-main" src={logo} alt="" />
      <img
        className="logo-text"
        src={text}
        alt=""
        style={{
			transform: `translateX(-50%) rotate(${scrollPosition * 0.1}deg)`
        }}
      />
    </Link>
  )
}

export default HeaderLogo
