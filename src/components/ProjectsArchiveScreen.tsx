import React, { useState } from 'react';
import {
  FolderHeart,
  Star,
  Trash2,
  Copy,
  Edit3,
  Calendar,
  Search,
  Plus,
  ArrowRight
} from 'lucide-react';
import { PromotionProject } from '../types';

interface ProjectsArchiveScreenProps {
  projects: PromotionProject[];
  onSelectProject: (p: PromotionProject) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (p: PromotionProject) => void;
  onToggleFavorite: (id: string) => void;
  onCreateNew: () => void;
}

export const ProjectsArchiveScreen: React.FC<ProjectsArchiveScreenProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onDuplicateProject,
  onToggleFavorite,
  onCreateNew
}) => {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'favorites' && !p.isFavorite) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.headline.toLowerCase().includes(q) ||
        p.storeName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-28 space-y-5 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full mb-1">
            <FolderHeart className="w-3.5 h-3.5" />
            내 홍보물 보관함
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            만들어둔 홍보물 ({projects.length})
          </h2>
        </div>

        <button
          onClick={onCreateNew}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> 새로 만들기
        </button>
      </div>

      {/* Search & Filter bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제목이나 업종으로 검색"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-rose-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'favorites' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-500'
            }`}
          >
            ★ 즐겨찾기
          </button>
        </div>
      </div>

      {/* Project Cards List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <FolderHeart className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">보관된 홍보물이 없습니다</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            새로운 홍보물을 만들면 여기에 자동으로 안전하게 보관됩니다.
          </p>
          <button
            onClick={onCreateNew}
            className="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
          >
            지금 첫 홍보물 만들기
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5"
            >
              <div
                onClick={() => onSelectProject(p)}
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={p.photoUrl}
                    alt={p.headline}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600">
                      {p.ratio}
                    </span>
                    <span className="text-[11px] text-slate-400">{p.createdAt}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm truncate mt-1">
                    {p.headline}
                  </h4>
                  <p className="text-xs text-rose-600 font-bold truncate">
                    ★ {p.priceBadge}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {p.storeName}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onToggleFavorite(p.id)}
                  title="즐겨찾기"
                  className={`p-2 rounded-xl transition-colors ${
                    p.isFavorite ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => onDuplicateProject(p)}
                  title="복사해서 새로 만들기"
                  className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectProject(p)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> 편집
                </button>

                <button
                  onClick={() => onDeleteProject(p.id)}
                  title="삭제"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
