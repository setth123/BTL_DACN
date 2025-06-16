import { useEffect, useRef, useState } from 'react';
import './KhuyenMai.css';
import { dateConnect, splitKMArr } from '../../helper/dtOutput';
import { useQuery } from '@tanstack/react-query';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const KhuyenMai = () => {
    const [oldKM, setOldKM] = useState([]);
    const [newKM, setNewKM] = useState([]);
    const [showLeftNew, setShowLeftNew] = useState(false);
    const [showRightNew, setShowRightNew] = useState(true);
    const [showLeftOld, setShowLeftOld] = useState(false);
    const [showRightOld, setShowRightOld] = useState(true);

    const newBoxRef = useRef(null);
    const oldBoxRef = useRef(null);

    const updateArrowVisibility = (ref, setLeft, setRight) => {
        const el = ref.current;
        if (!el) return;
        setLeft(el.scrollLeft > 0);
        setRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5); // -5 for margin tolerance
    };

    useEffect(() => {
        updateArrowVisibility(newBoxRef, setShowLeftNew, setShowRightNew);
        updateArrowVisibility(oldBoxRef, setShowLeftOld, setShowRightOld);
    }, [newKM, oldKM]);

    const handleScroll = (ref, setLeft, setRight) => {
        return () => updateArrowVisibility(ref, setLeft, setRight);
    };

    const scrollBox = (ref, offset) => {
        ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    const getKM = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/khuyen-mai/");
            if (!res.ok) throw new Error(`Error API: ${res.status} ${res.statusText}`);
            const data = await res.json();
            const { l, r } = splitKMArr(data);
            setOldKM(r);
            setNewKM(l);
            return data;
        } catch (e) {
            console.log("Error while fetching: ", e);
        }
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["ndKM"],
        queryFn: getKM
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error while fetching: {error.message}</p>;

    return (
        <div style={{ maxWidth: "90%", margin: "auto", marginTop: "6vh", marginBottom: "6vh" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                <h2>Khuyến mãi mới nhất</h2>
            </div>
            <div className="kmWrapper">
                {showLeftNew && (
                    <FaChevronLeft className="arrowBtn left" onClick={() => scrollBox(newBoxRef, -300)} />
                )}
                {showRightNew && (
                    <FaChevronRight className="arrowBtn right" onClick={() => scrollBox(newBoxRef, 300)} />
                )}
                <div
                    id="kmBoxs"
                    ref={newBoxRef}
                    onScroll={handleScroll(newBoxRef, setShowLeftNew, setShowRightNew)}
                >
                    {newKM.map((item, index) => (
                        <div key={index} id='km'>
                            <img src="/assets/sales-promotion-poster.jpg" alt="km" />
                            <div style={{padding: "5px"}}>Mã KM: <span className="kmCode">{item.maKhuyenMai}</span></div>
                            <div className="kmInfo">
                                <div>
                                    <p>Thời gian khuyến mãi</p>
                                    <p className="bold">{dateConnect(item.ngayBD, item.ngayKT)}</p>
                                </div>
                                <div>
                                    <p>Giao dịch tối thiểu</p>
                                    <p className="bold">{item.giaoDichToiThieu.toLocaleString("vi-VN")} VNĐ</p>
                                </div>
                            </div>
                            <div style={{padding: "5px"}}>
                                Mức khuyến mãi: <span className="kmPercent">{item.mucKhuyenMai} %</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                <h2>Khuyến mãi sắp hết hạn</h2>
            </div>
            <div className="kmWrapper">
                {showLeftOld && (
                    <FaChevronLeft className="arrowBtn left" onClick={() => scrollBox(oldBoxRef, -300)} />
                )}
                {showRightOld && (
                    <FaChevronRight className="arrowBtn right" onClick={() => scrollBox(oldBoxRef, 300)} />
                )}
                <div
                    id="kmBoxs"
                    ref={oldBoxRef}
                    onScroll={handleScroll(oldBoxRef, setShowLeftOld, setShowRightOld)}
                >
                    {oldKM.map((item, index) => (
                        <div key={index} id='km'>
                            <img src="/assets/sales-promotion-poster.jpg" alt="km" />
                            <div style={{padding: "5px"}}>Mã KM: <span className="kmCode">{item.maKhuyenMai}</span></div>
                            <div className="kmInfo">
                                <div>
                                    <p>Thời gian khuyến mãi</p>
                                    <p className="bold">{dateConnect(item.ngayBD, item.ngayKT)}</p>
                                </div>
                                <div>
                                    <p>Giao dịch tối thiểu</p>
                                    <p className="bold">{item.giaoDichToiThieu.toLocaleString("vi-VN")} VNĐ</p>
                                </div>
                            </div>
                            <div style={{padding: "5px"}}>
                                Mức khuyến mãi: <span className="kmPercent">{item.mucKhuyenMai} %</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KhuyenMai;
