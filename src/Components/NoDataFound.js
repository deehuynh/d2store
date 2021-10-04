import NoDataIMG from '../images/nodata2.png';

export default function NoDataFound () {
    return (
      <div className="no-data-found">
        <img src={NoDataIMG} />
      </div>
    );
}