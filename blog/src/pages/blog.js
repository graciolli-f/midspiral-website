import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UpdatesIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const updates = data.allMarkdownRemark.nodes

  if (updates.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <div className="updates-header">
          <h1 className="updates-page-title">Blog</h1>
        </div>
        <p>
          No content found. Add markdown posts to "content/updates" to see them here.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="updates-header">
        <h1 className="updates-page-title">Blog</h1>
      </div>
      <div className="updates-list">
        {updates.map(update => {
          const title = update.frontmatter.title || update.fields.slug

          return (
            <article
              key={update.fields.slug}
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header className="post-item-header">
                <h2 className="post-item-title">
                  <Link to={update.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <time className="post-item-date">{update.frontmatter.date}</time>
              </header>
              <section className="post-item-content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: update.frontmatter.description || update.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default UpdatesIndex

export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
