/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image, { FixedObject } from "gatsby-image";

import { rhythm } from "../../utils/typography";

const query = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    alipay: file(relativePath: { regex: "/alipay.png/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    wechat: file(relativePath: { regex: "/wechat.png/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          twitter
        }
      }
    }
  }
`;

interface Data {
  avatar: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };

  alipay: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };

  wechat: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };

  site: {
    siteMetadata: {
      author: {
        name: string;
        summary: string;
      };
      social: {
        twitter: string;
      };
    };
  };
}

const Avatar: FC<{
  fixed: Data["avatar"]["childImageSharp"]["fixed"];
  author: Data["site"]["siteMetadata"]["author"];
}> = ({ fixed, author }) => {
  return (
    <Image
      fixed={fixed}
      alt={author.name}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        minWidth: 50,
        borderRadius: "100%",
      }}
      imgStyle={{
        borderRadius: "50%",
      }}
    />
  );
};

const QRCode: FC<{
  fixed: Data["alipay"]["childImageSharp"]["fixed"];
  alt: string;
}> = ({ fixed, alt }) => {
  return (
    <Image
      fixed={fixed}
      alt={alt}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        minWidth: 50,
      }}
    />
  );
};

const Description: FC<{
  author: Data["site"]["siteMetadata"]["author"];
  social: Data["site"]["siteMetadata"]["social"];
}> = ({ author, social }) => {
  return (
    <p>
      <>Written by</>
      <strong>{author.name}</strong>
      <br />
      <>{`${author.summary} `}</>
      <a
        href={`https://twitter.com/${social.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        推我一把
      </a>
    </p>
  );
};

const Bio: FC<{}> = () => {
  const data = useStaticQuery<Data>(query);
  const { author, social } = data.site.siteMetadata;
  return (
    <>
      <div style={{ display: "flex" }}>
        <Avatar author={author} fixed={data.avatar.childImageSharp.fixed} />
        <Description author={author} social={social} />
      </div>
      <div style={{ textAlign: "right" }}>
        <QRCode
          fixed={data.alipay.childImageSharp.fixed}
          alt="用支付宝给「通讯录里最帅的那位(*健)」打钱"
        />
        <QRCode
          fixed={data.wechat.childImageSharp.fixed}
          alt="用微信给「宫不上(*健)」打钱"
        />
      </div>
    </>
  );
};

export default Bio;
