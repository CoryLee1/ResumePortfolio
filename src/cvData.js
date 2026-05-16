export const DATA = {
  meta: {
    name: "YIHUA LI",
    alias: "CORY",
    contact: {
      phone: "+1 301 979 5478",
      email: "cory958014884@gmail.com",
      emailAlt: "yl11194@nyu.edu",
      web: "https://coryleeart.com/",
      scholar: "https://scholar.google.com/citations?user=PIibA_wAAAAJ",
      twitter: "https://twitter.com/cory958014884",
      instagram: "https://www.instagram.com/cory_leeeee_/",
      loc: "Brooklyn, NY / Shanghai",
    },
  },
  sections: [
    {
      id: "profile",
      title: "PROFILE",
      visible: true,
      items: [
        {
          id: "s1",
          visible: true,
          content: {
            type: "text",
            text: "Cross-disciplinary creative technologist building at the intersection of AI, real-time 3D graphics, and human expression. Creator of award-winning AI systems exhibited at SIGGRAPH, NeurIPS, CVPR, and ARTECHOUSE NYC. SIGGRAPH 2025 Best Art Paper (11% acceptance). Currently shipping AI-related products at Xiaohongshu while developing Echuu — a real-time 3D AI VTuber creation platform.",
          },
        },
      ],
    },
    {
      id: "education",
      title: "EDUCATION",
      visible: true,
      items: [
        {
          id: "e1",
          visible: true,
          content: {
            type: "edu",
            school: "New York University",
            program: "MPS, Interactive Telecommunications Program (ITP)",
            date: "2023.09 – 2025.05",
            loc: "Brooklyn, NY",
            details: [
              "GPA 4.0/4.0 — Research: AI Application Systems, Real-time Generative Media",
              "Thesis: Echuu — AI VTuber Creation Platform",
              "NYU Tisch School of the Arts Graduate Scholarship",
            ],
          },
        },
        {
          id: "e2",
          visible: true,
          content: {
            type: "edu",
            school: "Donghua University",
            program: "BFA, Product Design",
            date: "2019 – 2023",
            loc: "Shanghai",
            details: [
              "Rank 3/57 · GPA 4.03/5.0 · Outstanding Graduate",
              "National Scholarship (2020–2022)",
              "Advisor: Prof. Jihong Yu",
            ],
          },
        },
      ],
    },
    {
      id: "work",
      title: "EXPERIENCE",
      visible: true,
      items: [
        {
          id: "w1",
          visible: true,
          content: {
            type: "work",
            co: "Xiaohongshu (REDnote)",
            role: "Product Manager",
            date: "2025.08 – Present",
            loc: "Shanghai",
            bullets: [
              "Led 0→1 development of Tabii, AI-powered visual bookmark Chrome extension with multimodal vision-language captioning (Qwen-VL) and vector similarity matching",
              "Full product lifecycle: concept → requirement → compliance → Chrome Web Store launch → Juguang promotion strategy",
              "Built frontend UI/interaction/animation + AI prototypes with Alibaba Cloud AnalyticDB vector search, tiered degradation",
              "Organic growth: 200+ community, 4,000+ likes, 40,000+ views — zero paid promotion",
            ],
            links: [
              {
                label: "Tabii · Chrome Web Store",
                url: "https://chromewebstore.google.com/detail/ldlifbcdlbonphobedkmignnjmfjdemk",
              },
            ],
          },
        },
        {
          id: "w2",
          visible: true,
          content: {
            type: "work",
            co: "Duolingo",
            role: "Brand Design Consultant",
            date: "2024.04",
            loc: "Remote",
            bullets: ["VTuber IP character and livestreaming strategy for Brand Design Team"],
          },
        },
        {
          id: "w3",
          visible: true,
          content: {
            type: "work",
            co: "Xue Zhiqian — MV: INFINITE",
            role: "Motion Graphics Designer",
            date: "2023.01",
            loc: "Shanghai",
            bullets: [
              "CG animation + AI frame interpolation for major Chinese artist",
              "1,167,000+ views · 6,897 likes on YouTube",
            ],
            links: [{ label: "Music video · INFINITE (YouTube)", url: "https://youtu.be/1FjXpFVZCZg" }],
          },
        },
        {
          id: "w4",
          visible: true,
          content: {
            type: "work",
            co: "Mirror World / rct.ai",
            role: "Design Intern → Director",
            date: "2022.05 – 08",
            loc: "Beijing",
            bullets: [
              "3D modeling, CG promo for NFT game Matrix",
              "Solo 30-sec promo video in 20 days — 2,000+ views on ENJINSTARTER",
              "\"Unstable Brain\" AI NPC API demo",
            ],
            links: [
              { label: "mirrorworld.fun", url: "https://mirrorworld.fun/" },
              {
                label: "Promo clip (X)",
                url: "https://twitter.com/joinmirrorworld/status/1612285639604727809?s=20",
              },
            ],
          },
        },
      ],
    },
    {
      id: "projects",
      title: "PROJECTS",
      visible: true,
      items: [
        {
          id: "p1",
          visible: true,
          content: {
            type: "proj",
            name: "Echuu",
            sub: "AI VTuber Creation Platform — Real-time 3D",
            date: "2025 –",
            url: "https://www.echuu.ai/",
            links: [
              { label: "Official website · Anngel", url: "https://www.anngel.live/" },
              { label: "Echuu · X (Twitter)", url: "https://x.com/Echuu_AIVTUBING" },
            ],
            bullets: [
              "World-first real-time 3D AI VTuber creation platform: dream characters → AI VTubers → live streams",
              "R3F + WebSocket + HLS/WebRTC · ACP framework (Agency, Embodiment, Temporality)",
              "CLS: 5 psycholinguistic cognitive modes for character performance",
              "Target: July 2026 demo · SIGGRAPH Asia 2026",
            ],
          },
        },
        {
          id: "p2",
          visible: true,
          content: {
            type: "proj",
            name: "PoeSpin",
            sub: "Human-AI Dance→Poetry · ML Installation + CGI + Paper",
            date: "2024 – 2025",
            url: "https://coryleeart.com/Poespin-Wherever-your-body-reach-there-is-a-poetry",
            bullets: [
              "Pole dance → poetry via multimodal ML + NLP + CGI (C4D, Blender, UE5, TouchDesigner)",
              "★ SIGGRAPH 2025 Best Art Paper — 4.7/5.0, 1/16, 11% acceptance",
              "MUSE Gold · 10+ exhibitions: ARTECHOUSE NYC, Deji Museum (w/ Beeple), NeurIPS, CVPR, Chinese CHI",
            ],
            links: [
              { label: "SIGGRAPH 2025 · DOI", url: "https://doi.org/10.1145/3736781" },
              {
                label: "Reviewer score supplement",
                url: "https://drive.google.com/file/d/1IfRNTqcIQ1hm9Zp_4yz-htIb4-XJUiEr/view?usp=sharing",
              },
            ],
          },
        },
        {
          id: "p3",
          visible: true,
          content: {
            type: "proj",
            name: "IRL to URL",
            sub: "AI-Native Game — Real Subway Social Spaces",
            date: "2024",
            url: "https://coryleeart.com/IRL-URL",
            bullets: [
              "Solo full-stack: Node.js + Gemini API + WebRTC + Three.js",
              "LA A+D Museum AI Award · Future Tense Award · Athens Digital Art Festival",
            ],
          },
        },
        {
          id: "p4",
          visible: true,
          content: {
            type: "proj",
            name: "Blibug",
            sub: "AI VTuber on Bilibili Danmaku · Unity + NLP",
            date: "2022 – 2023",
            url: "https://doi.org/10.1145/3591196.3596618",
            links: [{ label: "Video (YouTube)", url: "https://youtu.be/-6tBllXne40" }],
            bullets: ["First author — ACM CC'23 · 4 citations"],
          },
        },
      ],
    },
    {
      id: "publications",
      title: "PUBLICATIONS",
      visible: true,
      items: [
        {
          id: "pub1",
          visible: true,
          content: {
            type: "pub",
            title:
              "PoeSpin: A Human-AI Dance to Poetry System for Movement-Based Verse Generation",
            venue: "PACM-CGIT 8(3) · SIGGRAPH 2025 / Vancouver · doi:10.1145/3736781",
            note: "★ Best Art Paper · 4.7/5.0 · 11% acceptance · 1 citation",
            authors: "Yihua Li, H. Chen, Y. Li, Y. Xin — 1st author",
            href: "https://doi.org/10.1145/3736781",
            links: [
              {
                label: "Supplementary PDF",
                url: "https://drive.google.com/file/d/1fdQRLEWMN054HsIXzhXU3l3uv263SVu_/view?usp=sharing",
              },
            ],
          },
        },
        {
          id: "pub2",
          visible: true,
          content: {
            type: "pub",
            title: "Blibug: AI Vtuber Based on Bilibili Danmuku Interaction",
            venue: "ACM Creativity & Cognition (CC'23) / Online · pp.387–390",
            note: "13 citations",
            authors: "Yihua Li, Y. Sun, Y. Xu, J. Yu — 1st author",
            href: "https://doi.org/10.1145/3591196.3596618",
            links: [{ label: "Video", url: "https://youtu.be/-6tBllXne40" }],
          },
        },
        {
          id: "pub3",
          visible: true,
          content: {
            type: "pub",
            title:
              "Explore the Future Earth with Wander 2.0: AI Chatbot Driven By Knowledge-Base Story Generation",
            venue: "CHI 2023 Extended Abstracts / Hamburg",
            note: "27 citations",
            authors: "Y. Sun, Y. Xu, C. Cheng, Yihua Li, C. Lee, A. Asadipour — co-author",
          },
        },
        {
          id: "pub4",
          visible: true,
          content: {
            type: "pub",
            title:
              "Travel with Wander in the Metaverse: An AI Chatbot to Visit the Future Earth",
            venue: "IEEE MMSP 2022 / Online",
            note: "24 citations",
            authors: "Y. Sun, Y. Xu, C. Cheng, Yihua Li, CH Lee, A. Asadipour — co-author",
          },
        },
        {
          id: "pub5",
          visible: true,
          content: {
            type: "pub",
            title: "Wander [001]",
            venue: "SIGGRAPH Asia 2022 Art Gallery",
            note: "",
            authors: "Y. Sun, CH Lee, C. Cheng, A. Asadipour, Y. Xu, Yihua Li — co-author",
          },
        },
      ],
    },
    {
      id: "exhibitions",
      title: "EXHIBITIONS",
      visible: true,
      items: [
        { id: "ex1", visible: true, content: { type: "ln", l: "SIGGRAPH 2025 Art Gallery", r: "Vancouver 2025" } },
        { id: "ex2", visible: true, content: { type: "ln", l: "Digital Design Days × Prompt Magazine", r: "2025" } },
        { id: "ex3", visible: true, content: { type: "ln", l: "CVPR 2025 AI Art Gallery", r: "Nashville 2025" } },
        { id: "ex4", visible: true, content: { type: "ln", l: "Athens Digital Art Festival: Simulacra", r: "Athens 2024" } },
        { id: "ex5", visible: true, content: { type: "ln", l: "NYC ARTECHOUSE: Submerge", r: "New York 2024" } },
        {
          id: "ex6",
          visible: true,
          content: { type: "ln", l: "Nanjing Deji Museum: DIVERGE (group w/ Beeple)", r: "Nanjing 2024" },
        },
        { id: "ex7", visible: true, content: { type: "ln", l: "NeurIPS 2024 Creative AI Track", r: "Vancouver 2024" } },
        { id: "ex8", visible: true, content: { type: "ln", l: "Chinese CHI 2024 Art Gallery", r: "Shenzhen 2024" } },
        { id: "ex9", visible: true, content: { type: "ln", l: "Aspace Gallery NYC", r: "New York 2024" } },
        { id: "ex10", visible: true, content: { type: "ln", l: "LA A+D Museum", r: "Los Angeles 2024" } },
        { id: "ex11", visible: true, content: { type: "ln", l: "NYU ITP Spring Show", r: "New York 2024" } },
        { id: "ex12", visible: true, content: { type: "ln", l: "Asia Digital Art Award FUKUOKA", r: "Fukuoka 2022" } },
        { id: "ex13", visible: true, content: { type: "ln", l: "Tongji Design Week", r: "Shanghai 2021" } },
      ],
    },
    {
      id: "awards",
      title: "AWARDS",
      visible: true,
      items: [
        { id: "a1", visible: true, content: { type: "ln", l: "SIGGRAPH Best Art Paper — 1/16, 11%", r: "2025" } },
        { id: "a2", visible: true, content: { type: "ln", l: "DIA (Design Intelligence Award) Excellence", r: "2025" } },
        { id: "a3", visible: true, content: { type: "ln", l: "Art Laguna Prize — Finalist", r: "2025" } },
        { id: "a4", visible: true, content: { type: "ln", l: "FUTURE TENSE 3rd Edition — Shortlist", r: "2025" } },
        { id: "a5", visible: true, content: { type: "ln", l: "MUSE Design Award — Gold (AI Category)", r: "2024" } },
        { id: "a6", visible: true, content: { type: "ln", l: "LA A+D Museum — Generative AI Award", r: "2024" } },
        { id: "a7", visible: true, content: { type: "ln", l: "NYU TSOA Graduate Scholarship", r: "2023–25" } },
        {
          id: "a8",
          visible: true,
          content: {
            type: "ln",
            l: "Asia Digital Art FUKUOKA — Moving Image Finalist",
            r: "2022",
            url: "https://youtu.be/0B55EBBri_0",
          },
        },
        {
          id: "a9",
          visible: true,
          content: { type: "ln", l: "National Scholarship — China Ministry of Education", r: "2020–22" },
        },
      ],
    },
    {
      id: "talks",
      title: "INVITED TALKS",
      visible: true,
      items: [
        {
          id: "t1",
          visible: true,
          content: { type: "ln", l: "ZhenFund NY — AI Founder/Investor Closed-Door Event", r: "inv. Monica Xie" },
        },
        {
          id: "t2",
          visible: true,
          content: { type: "ln", l: "ASU Mix Center — Immersive Experience Design", r: "inv. Prof. Weidi Zhang" },
        },
      ],
    },
    {
      id: "press",
      title: "PRESS",
      visible: true,
      items: [
        {
          id: "pr1",
          visible: true,
          content: { type: "ln", l: "SIGGRAPH 2025 Interview: Dancing with Algorithm", r: "" },
        },
        { id: "pr2", visible: true, content: { type: "ln", l: "Prompt Magazine × Digital Design Days", r: "" } },
        {
          id: "pr3",
          visible: true,
          content: {
            type: "ln",
            l: "UAAD — On AI, Movement, Future of Digital Expression",
            r: "",
            url: "https://www.uaad.art/post/in-conversation-cory-yihua-li-on-ai-movement-and-the-future-of-digital-expression",
          },
        },
        { id: "pr4", visible: true, content: { type: "ln", l: "NYC ARTECHOUSE Interview", r: "" } },
        {
          id: "pr5",
          visible: true,
          content: {
            type: "ln",
            l: "MUSE Design Award — Official Interview",
            r: "",
            url: "https://muse.world/interview-with-yihua-li-from-vtubing-to-cgi-a-multi-faceted-media-artist/",
          },
        },
        {
          id: "pr6",
          visible: true,
          content: {
            type: "ln",
            l: "Globe — Interviews 60: Digital Artist",
            r: "",
            url: "https://www.youtube.com/watch?v=uj9Ak73--Pk",
          },
        },
        {
          id: "pr7",
          visible: true,
          content: { type: "ln", l: "CanvasRebel · VoyageLA · Boldjourney", r: "" },
        },
      ],
    },
    {
      id: "skills",
      title: "SKILLS",
      visible: true,
      items: [
        {
          id: "sk1",
          visible: true,
          content: {
            type: "kv",
            k: "ML / AI",
            v: "Python, multimodal ML, NLP, real-time AI, LLM integration",
          },
        },
        {
          id: "sk2",
          visible: true,
          content: {
            type: "kv",
            k: "FULL-STACK",
            v: "Next.js, React, R3F, Node.js, WebRTC, WebSocket, HLS",
          },
        },
        {
          id: "sk3",
          visible: true,
          content: {
            type: "kv",
            k: "3D / CREATIVE",
            v: "Blender, C4D (Octane), UE5, Unity, TouchDesigner, p5.js",
          },
        },
        {
          id: "sk4",
          visible: true,
          content: {
            type: "kv",
            k: "DESIGN",
            v: "Figma, Lottie, Rive, Adobe Suite, Product Prototyping",
          },
        },
        {
          id: "sk5",
          visible: true,
          content: {
            type: "kv",
            k: "LANGUAGE",
            v: "Native Chinese · Fluent English (IELTS 7.0)",
          },
        },
      ],
    },
    {
      id: "references",
      title: "REFERENCES",
      visible: true,
      items: [
        {
          id: "r1",
          visible: true,
          content: { type: "kv", k: "Daniel Shiffman", v: "YouTube 1.75M, The Coding Train" },
        },
        { id: "r2", visible: true, content: { type: "kv", k: "Shawn Van Every", v: "Chair, NYU ITP" } },
        { id: "r3", visible: true, content: { type: "kv", k: "Luba Elliot", v: "Curator, CVPR AI Art" } },
        { id: "r4", visible: true, content: { type: "kv", k: "Allison Parrish", v: "Electronic Poetry Artist, Mentor" } },
        {
          id: "r5",
          visible: true,
          content: { type: "kv", k: "John Henry Thompson", v: "Inventor of Lingo, Advisor" },
        },
        {
          id: "r6",
          visible: true,
          content: { type: "kv", k: "Heather Dewey-Hagborg", v: "DNA Digital Artist, Professor" },
        },
        { id: "r7", visible: true, content: { type: "kv", k: "Weidi Zhang", v: "Asst. Prof., ASU" } },
        {
          id: "r8",
          visible: true,
          content: { type: "kv", k: "Alan Yingtao Tian", v: "SAKANA AI (ex-Google DeepMind)" },
        },
        {
          id: "r9",
          visible: true,
          content: { type: "kv", k: "James Kuczinscky", v: "Brand Director, Duolingo" },
        },
        {
          id: "r10",
          visible: true,
          content: {
            type: "kv",
            k: "Yuqian Sun (CheeseTalk)",
            v: "PhD, Royal College of Art · Research Artist, Midjourney Storytelling Lab · fakecheese.me",
          },
        },
        {
          id: "r11",
          visible: true,
          content: {
            type: "kv",
            k: "00 Zhang (Aio0o0o0)",
            v: "Artist · MArch Bartlett UCL · Zabludowicz Collection · 00zhang.com",
          },
        },
      ],
    },
  ],
};

export const PRESETS = {
  full: { label: "ALL", secs: null },
  investor: {
    label: "EB-1A",
    secs: [
      "profile",
      "projects",
      "awards",
      "publications",
      "exhibitions",
      "press",
      "education",
      "talks",
      "work",
      "references",
    ],
  },
  curator: {
    label: "CURATOR",
    secs: [
      "profile",
      "exhibitions",
      "projects",
      "publications",
      "awards",
      "press",
      "education",
      "talks",
      "references",
    ],
  },
  recruiter: {
    label: "RECRUITER",
    secs: ["profile", "work", "projects", "skills", "education", "awards", "publications", "references"],
  },
};
