import React from "react";

function SystemFooter() {
  return (
    <footer className="layout-standard py-4 border-t border-t-border text-sm text-center text-heading font-lato">
      © Copyright {new Date().getFullYear()} Central Trademark Revival® is not a &quot;lawyer referral
      service&quot; and does not provide legal advice or participate in any
      legal representation.
    </footer>
  );
}

export default SystemFooter;
