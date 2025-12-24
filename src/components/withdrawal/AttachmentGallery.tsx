'use client';

import { Attachment } from '@/types/withdrawal';
import { FileImage, FileVideo, File, Play, Download } from 'lucide-react';
import { useState } from 'react';

interface AttachmentGalleryProps {
    attachments: Attachment[];
}

export default function AttachmentGallery({ attachments }: AttachmentGalleryProps) {
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);

    if (attachments.length === 0) {
        return (
            <div className="text-center py-8 text-white/40">
                <FileImage className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>ไม่มีไฟล์แนบ</p>
            </div>
        );
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'image':
                return <FileImage className="w-6 h-6" />;
            case 'video':
                return <FileVideo className="w-6 h-6" />;
            default:
                return <File className="w-6 h-6" />;
        }
    };

    const isValidUrl = (url: string) => {
        return url && !url.includes('placeholder');
    };

    return (
        <>
            <div className="attachment-gallery">
                {attachments.map((attachment) => (
                    <div
                        key={attachment.id}
                        className="attachment-item"
                        onClick={() => setSelectedAttachment(attachment)}
                    >
                        {attachment.type === 'image' && isValidUrl(attachment.url) ? (
                            <img src={attachment.url} alt={attachment.name} />
                        ) : attachment.type === 'video' && isValidUrl(attachment.url) ? (
                            <div className="relative w-full h-full bg-linear-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Play className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-cyan-500/20 to-indigo-500/20 flex flex-col items-center justify-center p-4">
                                {getIcon(attachment.type)}
                                <span className="text-xs text-white/60 mt-2 text-center truncate w-full">
                                    {attachment.name}
                                </span>
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Download className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedAttachment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedAttachment(null)}
                >
                    <div
                        className="max-w-4xl w-full glass-card-static p-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white">{selectedAttachment.name}</h3>
                            <button
                                onClick={() => setSelectedAttachment(null)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex items-center justify-center max-h-[70vh] overflow-auto">
                            {selectedAttachment.type === 'image' && isValidUrl(selectedAttachment.url) ? (
                                <img
                                    src={selectedAttachment.url}
                                    alt={selectedAttachment.name}
                                    className="max-w-full h-auto rounded-lg"
                                />
                            ) : selectedAttachment.type === 'video' && isValidUrl(selectedAttachment.url) ? (
                                <video
                                    src={selectedAttachment.url}
                                    controls
                                    className="max-w-full h-auto rounded-lg"
                                />
                            ) : (
                                <div className="text-center py-12">
                                    {getIcon(selectedAttachment.type)}
                                    <p className="mt-4 text-white/60">{selectedAttachment.name}</p>
                                    <a
                                        href={selectedAttachment.url}
                                        download
                                        className="glass-button mt-4 inline-flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        ดาวน์โหลด
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
