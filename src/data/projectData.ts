export const ProjectData = (index: number) => {
  const data = {
    1: {
      title: "viaPrize Gitcoin Fiat Integration",
      shortDescription:
        "The viaPrize team introduced fiat donation support during Gitcoin&apos;s GG21 and GG22 rounds, enabling users to donate through platforms like PayPal while converting fiat to stablecoins for on-chain transfers. This system increased donation sizes and participation while maintaining sybil resistance via verified PayPal accounts. They aim to integrate this directly into Grants Stack to boost accessibility and Allo GMV by up to 30%.",
      description:
        "The viaPrize team successfully added fiat donations to 2 rounds during GG21 and 4 rounds for GG22. \n\n# GG21 History \nNoah Chon Lee made this post proposing how fiat donation could work \nhttps://gov.gitcoin.co/t/10-000-donated-to-gitcoin-zuzalu-round-with-credit-card-pilot-project-proposal/18827 \n\nThe viaPrize team successfully built this for the Open Civics and Collab Tech rounds for GG21. https://gov.gitcoin.co/t/we-donated-to-gitcoin-projects-with-credit-card-review-of-paypal-fiat-payments-in-gg21/19287 \n\nMost of the other round leads during GG21 heard of this and asked if we could do the same thing for them. Unfortunately, we didn't have the resources to meet this community demand. \n\nThe GG21 rounds we did have the funds to support worked successfully. \nOpenCivics fiat stats: \nAverage PayPal donation size - $62.30 (crypto avg was $11.21) \nPayPal donation volume - 7.21% \nSee their review here: https://gov.gitcoin.co/t/gg21-retrospective-opencivics-collaborative-research-round/19313 \n\n# How this works \nFrom the user's perspective, they just check out using fiat like they would in any normal web2 online store. From the smart contract's perspective, it just receives funds from a wallet like in any web3 platform. \nSteps: \n-User sends $10 with PayPal (for example) \n-Our team sends 10 USDC from our own wallet \n-10 USDC lands in a custodial wallet associated with that user's PayPal account (1 wallet per PayPal account) \n-The 10 USDC continues on to the Gitcoin smart contract \n\nThe donation shows up on-chain within a few seconds of the user sending a fiat payment. \n\nThis means we need a ready supply of stablecoins in our own wallet that we replenish over time. \n\nSybil resistance consists of whether it is a \"verified PayPal account.\" After the round, we whitelist the wallets associated with the verified accounts to receive matching.\n\n# Potential Integration in Grants Stack \nWe believe the fiat donation volume would be much higher (perhaps 10-30%) if we had this feature built directly into Grants Stack instead of on a separate website. \nThis is also preferred so our team isn't stretched thin maintaining an entire Gitcoin copy instead of building in this particular feature. \n\nWith a single change that we already have ready, we believe we could increase Allo GMV by 10-30% today. \n\nLong-term, this could result in multiple times more Allo GMV as Gitcoin transitions from purely a crypto platform to a blockchain-based platform that anyone can use. This accessibility may open partnerships with major institutions. \n\nWe have this proposal written here for our team to be funded to build this into grants stack and we were encouraged by Sov, Meg, Kat, and Ed to put it to a DAO vote. Currently we are reviewing the legal side to make sure everything is considered before a vote. https://gov.gitcoin.co/t/gcp-017-updated-proposal-for-fiat-donations-in-grants-stack/19446 \n\nIf this goes well, we think we would transition viaPrize into a nonprofit and build up a for profit company normie.tech helping more web3 platforms be accessible to non-crypto users. \n\nThis could mean a future where people can send fiat directly to a smart contract. Users wouldn't need an onramp (which fail 78% of the time) or a steep learning curve to participate in web3. \nWeb3 would be accessible to 100x as many people. \n\n# GG22 \nFor GG22 Celo PG supplied 5000 USDGLO for our stablecoin balance and are paying us $1,500 for our services setting up fiat donations for the BioFi PathFinders and Regen Citizens rounds. \nThank you for this support! \n\nFor the Youth in Need and Ma Earth rounds on Arbitrum we supplied the funds for the reserves. \n\nYou can donate to these rounds with fiat at these links:\nqf.viaprize.org/biofipathfinders\nqf.viaprize.org/regencitizen\nqf.viaprize.org/maearth\nqf.viaprize.org/youthinneed\n\nFor all rounds we are taking approximately a 1.5% fee (PayPal takes 3.5% + $0.35 per tx and we take the remainder to equal 5%) which covers our costs of sponsoring gas and chargebacks. \n\nWe were encouraged by friends to apply for this. \nNote that we are being paid for the Celo rounds and are working to secure a paid contract directly with Gitcoin as well. \nFunding this would reward us for our months of unpaid work creating this system and setting up the OpenCivics, CollabTech, Youth in Need, and Ma Earth rounds. \n\n# Let Normies Use Your web3 Platform\nPlease contact us at normie.tech if you are public goods platform in the Alloverse who we can support with gasless transactions and fiat payments to your smart contracts.",
      bannerImageUrl: `/viaPrize-banner.jpeg`,
      logoImageUrl: `/viaPrize-logo.jpeg`,
      projectWebsite: "https://qf.viaprize.org/maearth",
      projectTwitter: "https://x.com/viaprize",
      projectOwner: "0x264f9EF85C21DE49451c3636116668889Ca41aab",
      profileId:
        "0x0051576d30c539cbfb0de951c1631507e3d68cb4dadd129c6e5936d7467a3498",
    },
    2: {
      title: "Hypercerts Foundation",
      shortDescription:
        "The Hypercerts Foundation pioneers open-source protocols to transparently fund and reward positive impact. Hypercerts are the web3 tools track impactful work, evaluate it and sell its impact.",
      description:
        "📣 We’re excited to announce the launch of our new dApp! Explore it now at https://hypercerts.org and see what we’ve built.\n\n> The Hypercerts Foundation pioneers open-source protocols to transparently fund and reward positive impact. Hypercerts are the web3 tools track impactful work, evaluate it and sell its impact.\n\n# Where are we headed\nImagine a world where positive impact was one of the most highly valued creations in our society; where entrepreneurs who pursued high-uncertainty, high-upside moonshots to radically improve society were rewarded directly for that impact; where becoming a patron of impactful causes was something people aspired to and displayed proudly; and where the methods used to evaluate impact were credible, transparent, and independently verifiable. \n\nThat world might seem a distance away, but it’s one we can build towards. Specifically we’d like to see more impact markets, retroactive funding and innovation in the way we fund public goods. In order for this to occur, we need protocols to track and fund impact.\n\n# What are hypercerts? \nA single hypercert is a semi-fungible token that accounts for work that’s intended to be impactful, and whose ownership can be fractionalized and even transferred under specific conditions. Each hypercert represents a unique impact claim capturing the following basic information:\n- Who: Set of contributors\n- What: Scope of work\n- When: Time of work\n\n\n## Avoiding silos – interconnected funding system\nAs an extension of ERC 1155 semi-fungible tokens, hypercerts create a single, open, shared, and decentralized database for funding mechanisms. This database avoids the creation of new funding silos, as hypercerts can be integrated into any existing funding platform, thereby creating an interconnected funding ecosystem.\n\n## Selling impact – moving beyond donation\nWhile hypercerts may be useful for any funding mechanism, they’re particularly valuable for retroactive funding as they provide baseline invariant guarantees that impact claims will not be forgotten. Projects create and sell impact, building financially sustainable and scalable revenue models. With hypercerts, we move beyond donations.\n\n## Certifying impact – open evaluation system\nCertifying impact is a process, and it should be an open and dynamic one. Hence, with hypercerts we create the foundation for an open evaluation system for credible and transparent impact assessment. Every hypercert can receive multiple evaluations from different evaluators using a variety of methodologies. This creates incentives to innovate evaluation methodologies and builds trust.\n\n# Where do we go from here\nLooking ahead, we aim to expand to more chains, enable evaluations with existing and new tools, enhance visualization with hyperboards, create marketplace tools, and collaborate for broader integration. With your support and a growing network, we're building a transparent interconnected funding ecosystem for positive impact.\n\n# The work so far\n- **Whitepaper:** We released our whitepaper (draft): https://hypercerts.org/docs/whitepaper/whitepaper-intro \n- **Core protocol:** We have build the core protocol and released it on Optimism, Celo, Base, and Arbitrum\n- **Marketplace protocol:** We have build out the marketplace functionalities to buy and sell hypercerts\n- **Evaluation infrastructure:** We have created the evaluation infrastructure for hypercerts based on EAS attestations\n- **Hyperboards:** We have implemented hyperboards to publicly recognize the financial and non-financial contributors\n- **dApp:** We have created a frontend for anyone to access the functionalities of hypercerts at [hypercerts.org](https://www.hypercerts.org/): (1) explore hypercerts, (2) mint new hypercerts, (3) create and view evaluations, (4) buy and sell hypercerts, (5) create collections and view ownership in hyperboards. You can also play around with it on testnets at https://testnet.hypercerts.org\n- **SDK:** We have build an SDK for anyone to build on top of the protocol: https://www.npmjs.com/package/@hypercerts-org/sdk \n- **Pilots with Gitcoin:** We have piloted hypercerts with the Gitcoin Rounds Alpha, Beta, and GR18 to show how they can be integrated into funding platforms – you can read more about it here: https://go.gitcoin.co/blog/hypercerts-for-public-goods-funding \n- **Pilots with Zuzalu:** We have piloted hypercerts with the pop-up city Zuzalu, retroactively raising 21 ETH and ZuConnect Istanbul raising 16 ETH for contributors to these events\n- **Community:** We have a core community (TG group: https://t.me/+YF9AYb6zCv1mNDJi) with many projects and platforms exploring how to use hypercerts\n- **Gitcoin Community Round:** We ran a Gitcoin Community Round with 35 projects in the Hypercerts Ecosystem: https://gov.gitcoin.co/t/retrospective-of-the-hypercerts-ecosystem-round-during-gg20/18908\n\n# The work ahead\n- **🎶 Fine-tune new dapp:** As with every release, there are still lots of small fixes to be deployed and user feedback to be implemented. This will be one of the priorities to focus on with the potential funds from this Gitcoin Round\n- **🔎 Enhanced evaluator functionality:** Beyond the current functionality, we want to: (1) Allow self-reports to be attached to each hypercert, (2) allow additional templates to be used for evaluations, (3) allow users to search based on evaluation outcomes, and (4) allow third-party evaluator tools, like Deresy, to be accessed via our frontend\n- **⚙️ Integrations:** Cooperate with funding platforms and projects to integrate hypercerts and build new applications like prize competitions with hypercerts\n\n# Testimonials \n\nJuan Benet (founder and CEO of Protocol Labs):\n> We are proud to be an early supporter of the Hypercerts Foundation, which will bring even greater focus and resources to this important area of innovation. The Hypercerts Foundation is helping build a more transparent and interoperable environment for funding public goods. We are excited to contribute to its mission in any way we can.\n\nKevin Owocki:\n> This is an exciting moment for the Hypercerts Foundation and for the future of impact funding. We are committed to advancing the development of decentralized protocols and novel coordination mechanisms.\n\n[See the announcement of the Hypercerts Foundation](https://hypercerts.notion.site/Introducing-the-Hypercerts-Foundation-d956203fe0fc4792980da138015e770a)\n\n# 📣 We’re excited to announce the launch of our new dApp! Explore it now at https://hypercerts.org and see what we’ve built.",
      bannerImageUrl: `/viaPrize-banner.jpeg`,
      logoImageUrl: `/viaPrize-logo.jpeg`,
      projectWebsite: "https://www.hypercerts.org",
      projectTwitter: "https://x.com/hypercerts",
      projectOwner: "0x264f9EF85C21DE49451c3636116668889Ca41aab",
      profileId:
        "0xa87df39f52e703cab5d5c8e27eebebefc2867f34ac9aeb28097095c8fe41a839",
    },
    3: {
      title: "Funding the Commons",
      shortDescription:
        "We build bridges between builders, funders and researchers focused on transforming the funding mechanisms for public goods. By bridging diverse communities from Web2, Web3, research, philanthropy, and industry, we aim to cultivate a sustainable ecosystem.",
      description:
        "We build bridges between builders, funders and researchers focused on transforming the funding mechanisms for public goods. By bridging diverse communities from Web2, Web3, research, philanthropy, and industry, we aim to cultivate a sustainable ecosystem. \n\nOur focus is on the development of independent thought-leadership, and the integration of funding platforms, strategic allocation of resources, and the incubation of projects with significant potential across the public goods landscape.",
      bannerImageUrl: `/viaPrize-banner.jpeg`,
      logoImageUrl: `/viaPrize-logo.jpeg`,
      projectWebsite: "https://fundingthecommons.io/",
      projectTwitter: "https://x.com/fundingcommons",
      projectOwner: "0x264f9EF85C21DE49451c3636116668889Ca41aab",
      profileId:
        "0x158ab8951774976a766c75367cc2995b796300ebb2212b4b8cf8ef9f2ffbd9a2",
    },
    4: {
      title: "VoiceDeck: A Marketplace for Impact Certificates",
      shortDescription:
        "VoiceDeck is an outcome-based donation platform where donors directly fund impactful results, recorded as hypercerts on Optimism. By separating funding from organizational branding, it ensures fair allocation based on actual outcomes achieved. With plans to integrate with Allo Protocol, this innovative model caps funding to documented outcomes.",
      description:
        "VoiceDeck is an outcome based online donation platform\n\n* Outcomes already achieved by organizations are recorded as hypercerts on OP mainnet\n\n* Donors can directly buy the outcomes they think are impactful, putting the focus on work done rather than the organization doing the work\n\n* Each outcome has a fixed price to prevent donors from overpaying. On VoiceDeck, organizations cannot raise more money than the impact they have created\n\n* Since launching on October 18 2024, we have had $53 in purchases from 6 donors to support civic activists in India with a history of outcomes\n\n**Integration with Allo Protocol**\n\nWe want to take our MVP for outcome based funding in journalism as a custom strategy on Allo protocol with the following features\n\n* Applicants list past outcomes they have created and the cost incurred to achieve that outcome in the application form to the round\n\n\n* Round operator converts those outcomes into hypercerts\n\n\n* Badgeholders choose the hypercerts they feel are valuable, see the price it needs to be fully funded, and make a decision on whether to allocate money for purchasing any of its units\n\n**Benefits**\n\n* Separates the organization from the outcome that is chosen for funding, alleviating criticism of retro rounds being a popularity contest and brand value being the most important\n\n\n* Creates a variable fundraising cap for each organization based on how many outcomes they list and the price of each outcome listed. \n\nExample: organization A lists 2 outcomes that cost them $100 and $1000 to achieve. They can raise at most $1100 in the round if both hypercerts of theirs get fully funded by badgeholders\n\n* Lends itself well to external (paid) evaluators who can provide attestations on the value of those outcomes for context to badgeholders. \n\nWe want a self-regulating mechanism where organizations don't list the cost of achieving the outcome too high since that lowers the impact score (the same outcome is less valuable if it costs more money to achieve it). And they don’t list the cost as too low since that would reduce the price of the hypercert and the eligible funding they can receive in the round.\n\n* Organizations must create new outcomes from money raised to be eligible in future rounds. If a hypercert gets fully funded, they can't list it again in future rounds\n\n**Drawbacks**\n\n* Requires a heavier lift from organizations, who have to think carefully about what outcomes they are proud of and estimate the cost of achieving that outcome\n\n* Ideally requires some verification of listed outcomes and also the costs of the outcome\n\n* Limits the total amount of funding the project receives to the outcomes they have created\n\n* Might be confusing for badgeholders or donors since they don’t have to judge organizations but what outcomes were worthy \n\n**Use of Funds**\n\n* Feedback from round operators and community rounds on utility of this module\n\n* Product document listing out requirements\n\n* Payment to developer for integrating outcome based  funding via hypercerts with Allo\n\n*This work is a collaboration between Holke Brammer and bitbeckers from the Hypercerts foundation, Sejal Rekhan from Gitcoin and Devansh Mehta from VoiceDeck*",
      bannerImageUrl: `/viaPrize-banner.jpeg`,
      logoImageUrl: `/viaPrize-logo.jpeg`,
      projectWebsite: "https://app.voicedeck.org",
      projectTwitter: "https://x.com/VoiceDeckDAO",
      projectOwner: "0x264f9EF85C21DE49451c3636116668889Ca41aab",
      profileId:
        "0xb30e9a03fe9391b289331bc8d4f3ad6aa31db301447025f92b8275bc88d447f9",
    },
  };
  return (
    data[index as keyof typeof data] || {
      title: "VoiceDeck: A Marketplace for Impact Certificates",
      shortDescription:
        "VoiceDeck is an outcome-based donation platform where donors directly fund impactful results, recorded as hypercerts on Optimism. By separating funding from organizational branding, it ensures fair allocation based on actual outcomes achieved. With plans to integrate with Allo Protocol, this innovative model caps funding to documented outcomes.",
      description:
        "VoiceDeck is an outcome based online donation platform\n\n* Outcomes already achieved by organizations are recorded as hypercerts on OP mainnet\n\n* Donors can directly buy the outcomes they think are impactful, putting the focus on work done rather than the organization doing the work\n\n* Each outcome has a fixed price to prevent donors from overpaying. On VoiceDeck, organizations cannot raise more money than the impact they have created\n\n* Since launching on October 18 2024, we have had $53 in purchases from 6 donors to support civic activists in India with a history of outcomes\n\n**Integration with Allo Protocol**\n\nWe want to take our MVP for outcome based funding in journalism as a custom strategy on Allo protocol with the following features\n\n* Applicants list past outcomes they have created and the cost incurred to achieve that outcome in the application form to the round\n\n\n* Round operator converts those outcomes into hypercerts\n\n\n* Badgeholders choose the hypercerts they feel are valuable, see the price it needs to be fully funded, and make a decision on whether to allocate money for purchasing any of its units\n\n**Benefits**\n\n* Separates the organization from the outcome that is chosen for funding, alleviating criticism of retro rounds being a popularity contest and brand value being the most important\n\n\n* Creates a variable fundraising cap for each organization based on how many outcomes they list and the price of each outcome listed. \n\nExample: organization A lists 2 outcomes that cost them $100 and $1000 to achieve. They can raise at most $1100 in the round if both hypercerts of theirs get fully funded by badgeholders\n\n* Lends itself well to external (paid) evaluators who can provide attestations on the value of those outcomes for context to badgeholders. \n\nWe want a self-regulating mechanism where organizations don't list the cost of achieving the outcome too high since that lowers the impact score (the same outcome is less valuable if it costs more money to achieve it). And they don’t list the cost as too low since that would reduce the price of the hypercert and the eligible funding they can receive in the round.\n\n* Organizations must create new outcomes from money raised to be eligible in future rounds. If a hypercert gets fully funded, they can't list it again in future rounds\n\n**Drawbacks**\n\n* Requires a heavier lift from organizations, who have to think carefully about what outcomes they are proud of and estimate the cost of achieving that outcome\n\n* Ideally requires some verification of listed outcomes and also the costs of the outcome\n\n* Limits the total amount of funding the project receives to the outcomes they have created\n\n* Might be confusing for badgeholders or donors since they don’t have to judge organizations but what outcomes were worthy \n\n**Use of Funds**\n\n* Feedback from round operators and community rounds on utility of this module\n\n* Product document listing out requirements\n\n* Payment to developer for integrating outcome based  funding via hypercerts with Allo\n\n*This work is a collaboration between Holke Brammer and bitbeckers from the Hypercerts foundation, Sejal Rekhan from Gitcoin and Devansh Mehta from VoiceDeck*",
      bannerImageUrl: `/viaPrize-banner.jpeg`,
      logoImageUrl: `/viaPrize-logo.jpeg`,
      projectWebsite: "https://app.voicedeck.org",
      projectTwitter: "https://x.com/VoiceDeckDAO",
      projectOwner: "0x264f9EF85C21DE49451c3636116668889Ca41aab",
      profileId:
        "0xb30e9a03fe9391b289331bc8d4f3ad6aa31db301447025f92b8275bc88d447f9",
    }
  );
};
