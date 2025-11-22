export const Contacts = () => {
  return (
    <div className="simple-glass rounded-3xl p-10 lg:p-24 text-center animate__animated animate__fadeIn">
      <p className="uppercase text-white/60 font-outfit font-bold tracking-widest mb-8 text-xl lg:text-2xl">
        Hello
      </p>
      <h2 className="font-outfit font-extrabold text-5xl lg:text-9xl text-white mb-16 leading-none tracking-tight">
        Let's work
        <br />
        together!
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=972535611522"
          rel="noreferrer"
          className="group rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6 text-white"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"><path d="M26.576 5.363a14.818 14.818 0 0 0-10.511-4.354C7.856 1.009 1.2 7.664 1.2 15.874c0 2.732.737 5.291 2.022 7.491l-.038-.07-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h.006c8.209-.003 14.862-6.659 14.862-14.868a14.82 14.82 0 0 0-4.349-10.507zM16.062 28.228h-.006c-2.319 0-4.489-.64-6.342-1.753l.056.031-.451-.267-4.675 1.227 1.247-4.559-.294-.467a12.23 12.23 0 0 1-1.889-6.565c0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353-5.53 12.353-12.353 12.353zm6.776-9.251c-.371-.186-2.197-1.083-2.537-1.208-.341-.124-.589-.185-.837.187-.246.371-.958 1.207-1.175 1.455-.216.249-.434.279-.805.094a10.23 10.23 0 0 1-2.997-1.852l.01.009a11.236 11.236 0 0 1-2.037-2.521l-.028-.052c-.216-.371-.023-.572.162-.757.167-.166.372-.434.557-.65.146-.179.271-.384.366-.604l.006-.017a.678.678 0 0 0-.033-.653l.002.003c-.094-.186-.836-2.014-1.145-2.758-.302-.724-.609-.625-.836-.637-.216-.01-.464-.012-.712-.012-.395.01-.746.188-.988.463l-.001.002a4.153 4.153 0 0 0-1.299 3.102v-.004a7.233 7.233 0 0 0 1.527 3.857l-.012-.015a16.693 16.693 0 0 0 6.251 5.564l.094.043c.548.248 1.25.513 1.968.74l.149.041a5.103 5.103 0 0 0 2.368.143l-.031.004a3.837 3.837 0 0 0 2.497-1.749l.009-.017a3.122 3.122 0 0 0 .214-1.784l.003.019c-.092-.155-.34-.247-.712-.434z" /></svg>
          </div>
          <span className="font-outfit font-bold text-white text-lg tracking-wide">
            WHATSAPP
          </span>
        </a>

        <a
          target="_blank"
          href="https://www.linkedin.com/in/aguseynov/"
          rel="noreferrer"
          className="group rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.466 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 7.332 20 12.586V19Z" />
            </svg>
          </div>
          <span className="font-outfit font-bold text-white text-lg tracking-wide">
            LINKEDIN
          </span>
        </a>

        <a
          href="mailto:alex.guseynov.23@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 11.065L4 6.511V6H20ZM4 18V9.044L11.496 13.312C11.652 13.401 11.826 13.445 12 13.445C12.174 13.445 12.348 13.401 12.504 13.312L20 9.044V18H4Z" />
            </svg>
          </div>
          <span className="font-outfit font-bold text-white text-lg tracking-wide">
            EMAIL
          </span>
        </a>
      </div>
    </div>
  );
};
