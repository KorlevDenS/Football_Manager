import './NavRow.css';

interface NavRowProps {
    inlineText: string;
    name: string;
    icon_url: string;
    onChange(selectedSection: string): void;
}

export default function NavRow({inlineText, name, icon_url, onChange} : NavRowProps) {

    return (
      <div className='NavRow' onClick={() =>onChange(name)}>

              <div className='icon-layout'>
                  <img className='nav_icon' src={icon_url} alt=""/>
              </div>
              <div className='nav-text-layout'>
                  <div className='nav-text'>{inlineText}</div>
              </div>

      </div>
    );
}