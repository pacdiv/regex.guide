import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { FooterLogo } from "./utils"
import { HomeTitle, LayoutContainer, MoreInfo } from "./layout.style"
import OpenSourceBanner from "./open-source-banner"
import { rhythm } from "../utils/typography"
import "./layout.css"

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { centered, children, homeLink, location } = this.props

    return (
      <LayoutContainer centered={centered}>
        <OpenSourceBanner />
        <main
          style={{
            ...(location.pathname !== "/playground" && {
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }),
          }}
        >
          {homeLink ? (
            <HomeTitle>
              <Link to={homeLink.href}>← {homeLink.label}</Link>
            </HomeTitle>
          ) : null}
          {children}
        </main>
        <footer>
          <MoreInfo>
            <FooterLogo />
          </MoreInfo>
        </footer>
      </LayoutContainer>
    )
  }
}

export default Layout
