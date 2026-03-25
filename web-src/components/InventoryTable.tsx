import React from "react";
import { InventoryItem } from "../../src/types";

type InventoryTableProps = {
  items: InventoryItem[];
  showActions?: boolean;
};

export function InventoryTable({
  items,
  showActions = false,
}: InventoryTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Unit</th>
            <th>Planned</th>
            <th>Issued</th>
            <th>Returned</th>
            <th>Missing</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const missing = Math.max(0, item.issuedQty - item.returnedQty);
            return (
              <tr key={item.id} className={missing > 0 ? "has-missing" : ""}>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.plannedQty}</td>
                <td>{item.issuedQty}</td>
                <td>{item.returnedQty}</td>
                <td className={missing > 0 ? "text-danger" : ""}>{missing}</td>
                {showActions && (
                  <td>
                    <button className="btn-small">View</button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
