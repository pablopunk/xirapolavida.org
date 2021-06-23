import Image from 'next/image'

const Footer = () => (
  <footer className="relative h-footer">
    <div className="bg-fg text-bgDim opacity-70 flex items-center justify-center z-10 h-[60px] absolute left-0 right-0">
      <p className="hidden px-4 opacity-80 md:block">
        Coordinadora galega da Xira zapatista pola Vida. 2021
      </p>
      <a href="mailto:xirapolavida@riseup.net" className="px-4">
        xirapolavida@riseup.net
      </a>
    </div>
    <Image
      src="/header.jpg"
      layout="fill"
      objectFit="cover"
      className="transform scale-110 filter blur-md "
    />
  </footer>
)

export default Footer
