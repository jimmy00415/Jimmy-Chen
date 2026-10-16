export interface CaseStudy {
  slug: string;
  category: 'work' | 'research';
  number: string;
  title: string;
  subtitle: string;
  role: string;
  status: string;
  period: string;
  tags: string[];
  summary: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  sources: { label: string; url: string; note: string }[];
}

export const cases: CaseStudy[] = [
  {
    slug: 'openclaw',
    category: 'work',
    number: '01',
    title: 'OpenClaw',
    subtitle: 'Keeping agent sessions usable when model capabilities change.',
    role: 'Open-source contributor',
    status: 'Merged contribution',
    period: 'October 2026',
    tags: [
      'Agent runtime',
      'TypeScript',
      'Model compatibility',
      'Regression testing',
    ],
    summary:
      'Contributed a merged repair for historical tool-call replay when switching to models without tool support, preserving conversational evidence without rewriting stored history.',
    sections: [
      {
        id: 'problem',
        title: 'A model switch should not break the conversation.',
        paragraphs: [
          'An agent conversation can outlive the model that began it. A session may use tools, record their results, and later continue with a different model. That history still matters: it contains the files the agent inspected, the arguments it supplied, and the evidence behind earlier answers.',
          'In OpenClaw, switching a tool-using session to a Chat Completions model configured with compat.supportsTools=false could still send historical tool protocol. A strict compatible server could reject that continuation with HTTP 400. Disabling new tool definitions was insufficient because the earlier calls and tool-role messages remained in the request.',
        ],
      },
      {
        id: 'contribution',
        title: 'Preserve the evidence. Adapt the transport.',
        paragraphs: [
          'I initiated and contributed the repair through pull request #148106. A maintainer subsequently completed the implementation in collaboration, retaining my contributor commits and credit. My role was an open-source contribution to agent-runtime compatibility; the merged solution reflects that shared work.',
          'The final implementation adapts historical tool activity into assistant text when preparing a request for a model without tool support. It retains tool identities, arguments, call IDs, and their paired results. This gives the next model usable conversational evidence while leaving the stored transcript unchanged. The adaptation happens at the request boundary, without requiring a migration or new user configuration.',
        ],
      },
      {
        id: 'design',
        title: 'The association between call and result is the important part.',
        paragraphs: [
          'Simply stripping protocol fields risks losing which result belongs to which action. The merged repair handles no-tools replay before strict message shaping can discard those identities. It also applies the tools decision consistently to definitions and replay, while preserving the existing cache exclusions for runtime context.',
          'The illustration on this page uses the synthetic example documented in the PR: two reads, two paths, two distinct returned values. It shows a serialization repair, not a live model execution. A reader should be able to follow each call through to its result in either representation.',
        ],
      },
      {
        id: 'evidence',
        title: 'A documented failing continuation, then a successful one.',
        paragraphs: [
          'The PR records validation with the real Ollama qwen3:8b model behind a strict recording proxy. The original continuation returned HTTP 400; after the repair, the same session returned HTTP 200 and the model correctly associated the distinct values with their source files.',
          'The proxy enforced the deterministic strict-server rejection. This is not a claim that Ollama itself rejects those fields. The PR also records regression coverage, a passing production build, and successful final-head CI. These are the contribution’s documented checks, not model experiments rerun while building this portfolio. GitHub’s live PR metadata confirms the contribution merged on 11 October 2026.',
        ],
      },
      {
        id: 'limits',
        title: 'A specific compatibility repair, with an inspectable scope.',
        paragraphs: [
          'This contribution addresses historical tool replay for the documented no-tools Chat Completions path. It does not establish universal compatibility across every provider or model. The useful result is narrower and concrete: a capability change can preserve the conversation’s evidence without asking a no-tools endpoint to interpret unsupported protocol.',
          'The PR is the primary artifact. Its discussion, implementation, test record, and maintainer collaboration make both the result and my contribution inspectable.',
        ],
      },
    ],
    sources: [
      {
        label: 'Merged pull request #148106',
        url: 'https://github.com/openclaw/openclaw/pull/148106',
        note: 'Implementation, contribution history, and documented validation.',
      },
    ],
  },
  {
    slug: 'simplify',
    category: 'work',
    number: '02',
    title: 'Simplify',
    subtitle: 'Building the path from AI-generated code to a live product.',
    role: 'Founder & CEO',
    status: 'MatchaCode CLI available · Flash Launch public beta',
    period: 'September 2025–present',
    tags: [
      'Product direction',
      'Developer tools',
      'AI coding',
      'Software publishing',
    ],
    summary:
      'Leading product direction and execution at Simplify, where MatchaCode supports creating software and Flash Launch supports publishing it.',
    sections: [
      {
        id: 'problem',
        title: 'Writing code is one part of shipping software.',
        paragraphs: [
          'AI makes it easier to start building. Getting from an idea to something usable still involves understanding an existing project, making coherent changes, testing them, and publishing the result. Each transition creates work for the person trying to bring a product into the world.',
          'Simplify’s product direction connects those parts of the journey. MatchaCode addresses creation in the repository and terminal. Flash Launch addresses publishing, deployment, domains, and release workflows. The shared aim is to give people a practical route from code to a product they can share and keep improving.',
        ],
      },
      {
        id: 'role',
        title: 'My responsibility: direction, decisions, and execution.',
        paragraphs: [
          'As Founder & CEO, I am responsible for company strategy, technology, product direction, and execution. My work connects the product questions with the technical decisions and coordination needed to move the team’s work forward. The public leadership page identifies this founder role.',
          'The products are Simplify’s team work. Their capabilities should not be read as a claim that I personally implemented every feature or wrote every component. The founder contribution is setting direction, making and coordinating decisions, and taking responsibility for the path from an intended experience to something the team can deliver.',
        ],
      },
      {
        id: 'matchacode',
        title: 'MatchaCode: create in the place the code lives.',
        paragraphs: [
          'MatchaCode is an AI coding CLI for reading a repository, planning a change, editing files, and running tests in the terminal. Its public product materials describe support for chosen model providers and compatible local endpoints, along with project rules, MCP tools, and skills.',
          'That scope keeps the repository and its working context central to the experience. Sessions remain on the user’s machine; model requests go to the provider they choose. The CLI is publicly available. IDE, desktop, and mobile clients are planned surfaces, rather than products presented here as already shipped.',
        ],
      },
      {
        id: 'flash-launch',
        title: 'Flash Launch: carry the work through to a release.',
        paragraphs: [
          'Flash Launch provides the publishing side of the journey. Simplify describes a workflow for connecting project source, building and deploying websites or apps, managing domains and environment configuration, and using logs and rollback to continue improving after a release.',
          'The company’s product page labels Flash Launch a public beta. That is the status used here. Its public website is reachable, but a reachable product page is not evidence that every advertised workload has been independently tested. The product destination is the place to inspect current availability, supported workloads, and plan limits.',
        ],
      },
      {
        id: 'evidence',
        title: 'Public products, clear attribution, and room to build.',
        paragraphs: [
          'The company website, leadership page, and individual product pages provide an inspectable snapshot of the team and product positioning. Both direct product destinations were checked while preparing this site. These sources support the founder role, stated capabilities, and availability labels used in this case.',
          'They do not establish revenue, customer adoption, deployment volume, uptime, or a quantified business outcome. I do not attach those claims to this work. The substantive story is the responsibility of building an AI software company: making creation and publishing fit together, deciding what to deliver, and carrying that direction through execution.',
        ],
      },
    ],
    sources: [
      {
        label: 'Simplify',
        url: 'https://simplify-net.com/',
        note: 'Company positioning and current product availability labels.',
      },
      {
        label: 'Leadership',
        url: 'https://simplify-net.com/leadership/',
        note: 'Jimmy Chen’s Founder & CEO role and responsibilities.',
      },
      {
        label: 'MatchaCode',
        url: 'https://matchacode.net/',
        note: 'Public CLI product; additional client surfaces remain planned.',
      },
      {
        label: 'Flash Launch',
        url: 'https://flashlaunch.net/',
        note: 'Public beta product destination.',
      },
      {
        label: 'MatchaCode product overview',
        url: 'https://simplify-net.com/products/matchacode/',
        note: 'Simplify’s description of the CLI workflow and product scope.',
      },
      {
        label: 'Flash Launch product overview',
        url: 'https://simplify-net.com/products/flash-launch/',
        note: 'Simplify’s description of publishing and release workflows.',
      },
    ],
  },
  {
    slug: 'movie-intelligence',
    category: 'work',
    number: '03',
    title: 'Hong Kong Movie Intelligence',
    subtitle: 'Grounded answers require governed evidence.',
    role: 'Software Engineer Intern · Motion Expert Limited',
    status: 'Public technical demo / MVP slice',
    period: 'July–August 2026',
    tags: ['RAG', 'FastAPI', 'pgvector', '768-dimensional retrieval', 'GCP'],
    summary:
      'Worked on Hong Kong movie intelligence across retrieval, data lineage, integrity gates, and delivery. The public RAG slice makes the evidence pipeline inspectable across 4.6K+ film records.',
    sections: [
      {
        id: 'problem',
        title: 'A relevant result still needs a trustworthy source.',
        paragraphs: [
          'A movie question can involve a title, person, genre, period, or a more detailed question about a film. Semantic similarity helps find possible evidence. It does not, by itself, establish that a retrieved record belongs to the right release, supports the answer, or can be cited accurately.',
          'The engineering problem was to connect retrieval with governed data and inspectable evidence. The public technical slice builds on a versioned data foundation, with deterministic metadata passages, validated retrieval artifacts, and citation-grounded answers. The pipeline matters because an answer is only as defensible as the evidence that reaches it.',
        ],
      },
      {
        id: 'contribution',
        title: 'My internship work and the public slice.',
        paragraphs: [
          'During my software engineering internship at Motion Expert Limited, my work covered semantic search, citation-grounded RAG, FastAPI services, deterministic lineage, integrity gates, and GCP delivery. My CV also records Graph Atlas work on three-hop relationship analysis. That broader internship account and the public RAG repository have different scopes.',
          'The repository is the inspectable RAG slice, rather than independent proof of every feature described in the internship. Its active R3 release documents 4,659 movie records and 768-dimensional embeddings. Historical R2 documentation uses 4,658 movies, so the portfolio overview uses 4.6K+ film records instead of combining exact counts from different releases.',
        ],
      },
      {
        id: 'pipeline',
        title: 'Governed source → validated retrieval → cited answer.',
        paragraphs: [
          'The public pipeline separates source data, release artifacts, retrieval, and answer generation. Bundle verification binds the release’s metadata and document passages to the artifacts used downstream. Cloud SQL PostgreSQL with pgvector supports semantic retrieval; FastAPI provides the service layer, with Vertex AI used for embedding and generation.',
          'The README describes domain checks before retrieval, validated similarity distances, and evidence selection tied to returned citations and movie cards. For PDF-supported answers, a page citation is required. Recommendation titles and citation markers are rendered from validated evidence associations, rather than trusting a model to invent the final identity of a result.',
          'This is a readable systems boundary: govern what enters the release, validate what retrieval returns, and preserve the connection between the evidence and what the visitor sees.',
        ],
      },
      {
        id: 'release',
        title: 'Delivery is part of the evidence chain.',
        paragraphs: [
          'The repository documents deterministic bundle checks, container preparation, GCP deployment procedures, and candidate acceptance before a stable traffic change. These workflows make the relationship between a verified artifact and a release explicit. They also keep raw source documents separate from the code and container image.',
          'A documented deployment procedure is not, on its own, proof of a successful deployment. This case links the public source instead of inventing a live-demo destination. The architecture illustration summarizes the pipeline without redistributing uncertain movie-poster assets, restricted documents, or infrastructure details.',
        ],
      },
      {
        id: 'limits',
        title: 'A verifiable demo with a deliberately bounded claim.',
        paragraphs: [
          'The README explicitly scopes the repository as a minimum verifiable demo/MVP slice. It does not claim production readiness, customer adoption, production service guarantees, or a general end-user authorization system. Conversation history is bounded session context, not durable personal memory.',
          'The result I want a reviewer to inspect is the engineering discipline around grounded retrieval: source authority, release identity, validation, citation integrity, and delivery gates. Corpus size describes film records. It is not a measure of users, business traction, or evidence that one embedding configuration universally outperforms another.',
        ],
      },
    ],
    sources: [
      {
        label: 'Public RAG repository',
        url: 'https://github.com/jimmy00415/HK_Movie_RAG_Chatbot',
        note: 'Versioned technical-demo scope, retrieval contracts, and release workflows.',
      },
    ],
  },
  {
    slug: 'personal-ai-memory',
    category: 'research',
    number: '04',
    title: 'Personal AI Memory',
    subtitle: 'Retrieve the right episode. Inspect the original evidence.',
    role: 'Independent agent-systems research',
    status:
      'Evaluation infrastructure implemented · comparative research ongoing',
    period: 'Ongoing · milestone recorded 6 October 2026',
    tags: [
      'Long-term memory',
      'Multimodal evidence',
      'Retrieval',
      'Reproducible evaluation',
    ],
    summary:
      'Building reproducible evaluation infrastructure to study how episode retrieval and access to original multimodal evidence influence future-behavior prediction.',
    sections: [
      {
        id: 'question',
        title: 'What should a personal AI remember—and look at again?',
        paragraphs: [
          'How should a personal AI retrieve and inspect long-term multimodal history to make better predictions about what someone will do next? I am investigating that question as two connected problems. First, retrieve the relevant episode from a large history. Then, inspect the evidence within that episode instead of relying entirely on a compressed textual account.',
          'A larger context window does not settle either question. An available episode may be irrelevant, and a useful episode may contain details that its summary leaves out. The research asks how retrieval choices and access to original evidence change the information available for a fixed prediction task.',
        ],
      },
      {
        id: 'infrastructure',
        title: 'The completed work is the evaluation foundation.',
        paragraphs: [
          'At the milestone recorded on 6 October 2026, I had built a data and evaluation layer covering 1,397,234 events and 1,500 NextAct prediction points using NextMe-800 and EgoLife. These are external research resources, credited as such. The counts describe the data and evaluation scope; they do not describe people, product users, or model-training volume.',
          'The recorded engineering work includes reproduction of official text contexts, checks excluding target fields from model inputs, and stable event identities. It also includes design work separating episode retrieval from text and visual rendering. Keeping those concerns distinct supports comparison without silently changing the task being evaluated.',
        ],
      },
      {
        id: 'evidence',
        title: 'A dated milestone, with a clear boundary.',
        paragraphs: [
          'My project records and updated CV report 47 validation tests passing at that milestone. That is a historical validation record for the evaluation infrastructure, rather than a claim that those tests were rerun to build this website. The scale and test count are owner-reported project evidence; no public research-code repository or publication is established here.',
          'The implemented foundation makes a specific question testable. It does not establish that a particular memory representation produces better predictions. I distinguish the engineering artifacts I built from the hypotheses I am still investigating so a reader can assess the present state of the work.',
        ],
      },
      {
        id: 'design',
        title: 'Hold the task fixed. Change the memory.',
        paragraphs: [
          'The experimental direction is to keep the prediction task and model fixed while comparing memory representations and retrieval choices. Text-only, visual, and hybrid evidence are candidate representations. Recent-history and long-term retrieval are candidate ways to select what the model can inspect.',
          'The diagram on this page is explicitly a research design. It separates selecting an episode from rendering its evidence as text, visual, or hybrid context. Those choices are to be compared under the same prediction task and model. It is not a benchmark result or a claim that visual evidence, more history, or hybrid retrieval must improve performance.',
        ],
      },
      {
        id: 'limits',
        title: 'Reproduction is necessary; causal claims need more.',
        paragraphs: [
          'The project audited an important protocol distinction: reproducing an official index-based context is not identical to constructing history with a strict timestamp filter. I therefore do not describe the entire reproduced benchmark as strictly temporally causal. Excluding target fields is a useful check, but it does not erase that methodological difference.',
          'A small text-versus-nine-frames pilot did not establish a positive long-term-memory effect. Comparative evaluation remains ongoing. The open question is whether retrieving a useful episode and inspecting its original evidence improves prediction under a clearly specified protocol. The work is research infrastructure and investigation, without a claim of publication, peer review, or a validated prediction breakthrough.',
        ],
      },
    ],
    sources: [],
  },
];
