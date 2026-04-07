import { Shield, Lock, Wifi, WifiOff } from "lucide-react";

export default function PrivacyBadge() {
  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;

  return (
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            プライバシー保護
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400">
              <Lock size={9} />
              <span>データ外部送信なし</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400">
              {isOnline ? (
                <Wifi size={9} />
              ) : (
                <WifiOff size={9} />
              )}
              <span>{isOnline ? "オンライン（AI処理はローカル）" : "オフライン動作中"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
