import Image from 'next/image'

const Footer = () => (
  <footer className="relative h-footer">
    <div className="bg-footer text-fg flex items-center justify-center z-10 h-[60px] absolute left-0 right-0">
      <p className="hidden px-4 opacity-80 md:block">
        Coordinadora galega da Xira zapatista pola Vida. 2021
      </p>
      <a href="mailto:xirapolavida@riseup.net" className="px-4">
        xirapolavida@riseup.net
      </a>
    </div>
    <div className="w-full overflow-hidden h-footer">
      <img
        src="/header.jpg"
        className="object-cover w-full h-full overflow-hidden transform scale-110 filter blur-md"
        loading="lazy"
      />
    </div>
  </footer>
)

export default Footer
