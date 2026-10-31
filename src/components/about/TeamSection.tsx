const team = [
  {
    name: "",
    role: "",
    avatarGradient: "",
    initials: "",
    bio: "",
    skills: [""],
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
  },
  {
    name: "",
    role: "",
    avatarGradient: "",
    initials: "",
    bio: "",
    skills: [""],
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
  },
  {
    name: "",
    role: "",
    avatarGradient: "",
    initials: "",
    bio: "",
    skills: [""],
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
  },
  {
    name: "",
    role: "",
    avatarGradient: "",
    initials: "",
    bio: "",
    skills: [""],
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
  },
  {
    name: "",
    role: "",
    avatarGradient: "",
    initials: "",
    bio: ".",
    skills: [""],
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
  },
  {
    name: "",
    role: "",
    avatarGradient: "",
    initials: "",
    bio: "",
    skills: [""],
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-plum uppercase backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>The Builders</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl">
            Meet our team
          </h2>
          <p className="mt-4 text-lg text-plum/70">
            A multidisciplinary collective of engineers, designers, and strategists driven by craft,
            curiosity, and measurable results.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-plum/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-xl"
            >
              <div>
                {/* Placeholder Photo / Styled Avatar */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-mist to-white shadow-inner">
                  {/* Stylized geometric background */}
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br ${member.avatarGradient} opacity-85 transition-transform duration-500 group-hover:scale-105`}
                  />

                  {/* Geometric decorative elements */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]"
                  />

                  {/* Avatar graphic silhouette / badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white select-none">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-3xl font-extrabold tracking-wider shadow-lg">
                      {member.initials}
                    </div>
                    <span className="mt-3 text-xs font-semibold tracking-wider text-white/90 uppercase">
                      Quantimite Core
                    </span>
                  </div>
                </div>

                {/* Member Details */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold tracking-tight text-plum group-hover:text-violet transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-azure">
                    {member.role}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-plum/75">
                    {member.bio}
                  </p>
                </div>

                {/* Skills / Expertise Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      className="inline-block rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-medium text-plum/70 border border-plum/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3 border-t border-plum/5 pt-5 text-plum/50">
                {/* LinkedIn */}
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn profile`}
                  className="rounded-lg p-1.5 transition-colors hover:bg-violet/10 hover:text-violet"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub profile`}
                  className="rounded-lg p-1.5 transition-colors hover:bg-violet/10 hover:text-violet"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s X profile`}
                  className="rounded-lg p-1.5 transition-colors hover:bg-azure/10 hover:text-azure"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={member.social.email}
                  aria-label={`Send an email to ${member.name}`}
                  className="rounded-lg p-1.5 transition-colors hover:bg-azure/10 hover:text-azure"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
