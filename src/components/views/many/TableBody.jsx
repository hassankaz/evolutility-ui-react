import { Link } from "react-router-dom";
import { fieldIsNumber, fieldTypes as ft } from "../../../utils/dico";
import { fieldValue } from "../../../utils/format";

const TableBody = ({ fields, data, iconPath, link }) => {
  const icon = iconPath ? (
    <img className="e-icon" src={"/pix/" + iconPath} alt="" />
  ) : null;

  const tableCell = (d, f, idx) => {
    const isLov = f.type === ft.lov;
    const value = d[f.id];
    if (idx === 0) {
      // - First column is a link
      return (
        <td key={f.id}>
          <Link to={link + d.id}>
            {icon}
            {value ? fieldValue(f, value, true) : "( " + d.id + " )"}
          </Link>
          {d.nb_comments && " " + d.nb_comments + " comments"}
        </td>
      );
    }
    if (f.type === ft.image) {
      return (
        <td key={f.id}>
          {value && <Link to={link + d.id}>{fieldValue(f, value, true)}</Link>}
        </td>
      );
    }
    if (f.type === ft.color) {
      return (
        <td key={f.id}>
          <div
            className="evo-color-box"
            id={f.id}
            style={{ backgroundColor: value }}
            title={value}
          />
        </td>
      );
    }
    if (isLov) {
      // if (f.lovIcon) {
      //   const icon = value?.icon;
      //   if (icon) {
      //     return (
      //       <td key={f.id}>
      //         <div className="nobr">
      //           <img src={`/pix/${icon}`} className="lov-icon" alt="" />
      //           {fieldValue(f, value, true)}
      //         </div>
      //       </td>
      //     );
      //   } else {
      //     const fv = d[f.id];
      //     return (
      //       <td key={f.id}>
      //         <div className="nobr">
      //           {fv && fv?.icon && <img src={"/pix/" + fv?.icon} alt="" />}
      //           {fv?.name}
      //         </div>
      //       </td>
      //     );
      //   }
      //   return fieldValue(f, value, true);
      // } else {
      return (
        <td key={f.id}>
          <div className="nobr">{fieldValue(f, value, true)}</div>
        </td>
      );
      // }
      // } else if (f.type === ft.list) {
      //   const lovMap = getLovMap(f);
      //   return (
      //     <td key={f.id}>
      //       <div className="list-tags">
      //         {(value || []).map((v) => (
      //           <div key={v}>{lovMap[v] || "N/A"}</div>
      //         ))}
      //       </div>
      //     </td>
      //   );
    }
    let css;
    if (fieldIsNumber(f)) {
      css = "align-right";
    } else if (f.type === ft.bool) {
      css = "td-check";
    } else if (f.type === ft.url) {
      css = "td-url";
    }
    return (
      <td className={css} key={f.id}>
        {fieldValue(f, value, true)}
      </td>
    );
  };

  return (
    <tbody>
      {data?.map((d) => (
        <tr key={d.id}>{fields.map((f, idx) => tableCell(d, f, idx))}</tr>
      ))}
    </tbody>
  );
};

export default TableBody;
