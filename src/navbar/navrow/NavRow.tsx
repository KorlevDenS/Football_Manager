import './NavRow.css';

interface NavRowProps {
    inlineText: string;
    icon_url: string;
    goTo() : void;
}
export default function NavRow({inlineText, icon_url, goTo} : NavRowProps) {

    return (
      <div className='NavRow' onClick={goTo}>

              <div className='icon-layout'>
                  <img className='nav_icon' src={icon_url} alt=""/>
              </div>
              <div className='nav-text-layout'>
                  <div className='nav-text'>{inlineText}</div>
              </div>

      </div>
    );
}