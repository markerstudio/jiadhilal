import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Icon } from './Icon';
import { EmptyState } from './ui';
import { store } from '../lib/store';
import { compressImage } from '../lib/image';
import { todayISO, relativeDay } from '../lib/derive';
import type { ProgressPhoto } from '../lib/types';

/**
 * Progress photos — upload (camera or library), gallery strip, and an automatic
 * before/after comparison of the first vs latest shot. Used on the client's
 * Progress screen (readOnly=false) and the coach's client detail (readOnly).
 */
export function PhotoSection({ clientId, readOnly = false }: { clientId: string; readOnly?: boolean }) {
  const [photos, setPhotos] = React.useState<ProgressPhoto[] | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [viewer, setViewer] = React.useState<ProgressPhoto | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const reload = React.useCallback(async () => {
    try {
      setPhotos(await store.listPhotos(clientId));
    } catch (e) {
      console.error('photos load failed', e);
      setPhotos([]);
    }
  }, [clientId]);

  React.useEffect(() => {
    void reload();
  }, [reload]);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const data = await compressImage(file);
      await store.addPhoto({ clientId, date: todayISO(), data });
      await reload();
    } catch (e) {
      console.error('photo upload failed', e);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    await store.deletePhoto(id);
    await reload();
  };

  if (!photos) return null;
  const first = photos[0];
  const latest = photos[photos.length - 1];
  const today = todayISO();

  return (
    <Card variant="dark" padding="16px">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
          Progress photos
        </span>
        {!readOnly && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
                e.target.value = '';
              }}
            />
            <Button variant="secondary" size="sm" disabled={busy} onClick={() => fileRef.current?.click()} iconLeft={<Icon name="plus" size={15} />}>
              {busy ? 'Uploading…' : 'Add photo'}
            </Button>
          </>
        )}
      </div>

      {photos.length === 0 && (
        <EmptyState
          title="No photos yet"
          hint={readOnly ? 'Photos the client uploads will appear here.' : 'Same spot, same light, same pose — once a week. The mirror lies, photos don’t.'}
        />
      )}

      {/* before / after */}
      {first && latest && first.id !== latest.id && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[first, latest].map((p, i) => (
            <div key={p.id} style={{ position: 'relative' }}>
              <img
                src={p.data}
                alt={i === 0 ? 'First photo' : 'Latest photo'}
                onClick={() => setViewer(p)}
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'block' }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 8,
                  bottom: 8,
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'rgba(20,17,24,0.8)',
                  color: i === 0 ? 'var(--gray-300)' : 'var(--green-neon)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '3px 9px',
                }}
              >
                {i === 0 ? `Start · ${p.date.slice(5)}` : `Latest · ${p.date.slice(5)}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* gallery strip */}
      {photos.length > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="screen-scroll">
          {[...photos].reverse().map((p) => (
            <div key={p.id} style={{ flex: 'none', width: 84, position: 'relative' }}>
              <img
                src={p.data}
                alt={`Photo ${p.date}`}
                onClick={() => setViewer(p)}
                style={{ width: 84, height: 112, objectFit: 'cover', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'block' }}
              />
              <div style={{ fontSize: 10, color: 'var(--gray-500)', fontWeight: 700, marginTop: 3, textAlign: 'center' }}>
                {relativeDay(p.date, today)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* full-screen viewer */}
      {viewer && (
        <div
          onClick={() => setViewer(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'rgba(10,8,14,0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            cursor: 'zoom-out',
          }}
        >
          <img src={viewer.data} alt={`Photo ${viewer.date}`} style={{ maxWidth: '100%', maxHeight: '80dvh', borderRadius: 'var(--radius-lg)' }} />
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-300)' }}>{viewer.date}</span>
            {!readOnly && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  void remove(viewer.id);
                  setViewer(null);
                }}
                style={{ background: 'none', border: 'none', color: 'var(--red-neon)', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Icon name="trash" size={15} /> Delete
              </button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
