import { useState, useEffect } from "react";
import Modal from "react-modal";
import { api } from "services/api";
import { Loading } from "components/Loading";
import { CgClose } from "react-icons/cg";
import { OrdersModalItem } from "../OrdersModalItem";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  userId: string | any;
}

export function OrdersModal({ isOpen, onRequestClose, userId }: Props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get(`orders/findbybuyerid/${userId}`);
        setOrders(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <div className={styles["content"]}>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <CgClose size={24} color="#1A2029" />
        </button>

        <h2 className={styles.heading}>Regerências</h2>
        <span className={styles.subheading}>Lista dos referências geradas</span>
        <span className={styles.count}>{orders?.length} Referências</span>

        <div className={styles["order-wrapper"]}>
          {loading ? (
            <Loading />
          ) : error ? (
            <div className={styles.empty}>
              <span>A lista está vazia.</span>
            </div>
          ) : (
            <>
              {!orders?.length ? (
                <>
                  <div className={styles.empty}>
                    <span>A lista está vazia.</span>
                  </div>
                </>
              ) : (
                <>
                  {orders?.map((item: any) => {
                    return <OrdersModalItem key={item?._id} item={item} />;
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
