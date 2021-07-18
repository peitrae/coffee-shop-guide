import React, { useState, useEffect } from "react";

import ErrorMessage from "../../../../../../components/ErrorMessage";
import { Button } from "../../../../../../components/UI/Button";
import Modal from "../../../../../../components/UI/Modal";
import Spinner from "../../../../../../components/UI/Spinner";
import WarningModal from "../WarningModal";
import PromoList from "./components/PromoList";
import AddPromo from "./components/AddPromo";
import { deletePromo, getPromos, addPromo, editPromo } from "./utils";

const Promos = ({
  coffeeShopId,
  coffeeShopName,
  handleClose: handleClosePromos,
}) => {
  const [coffeeShopPromos, setCoffeeShopPromos] = useState(null);
  const [deletePromoId, setDeletePromoId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [newPromo, setNewPromo] = useState("");

  useEffect(() => {
    const fetchData = async (coffeeShopId) => {
      const coffeeShopPromos = await getPromos(coffeeShopId);

      setLoading(false);
      setCoffeeShopPromos(coffeeShopPromos);
    };

    fetchData(coffeeShopId);
  }, [coffeeShopId]);

  const handleShowWarning = (promoId) => setDeletePromoId(promoId);

  const handleCloseWarning = () => setDeletePromoId(null);

  const handleClose = () => {
    setError(null);
    handleClosePromos();
};

  const handleAddPromo = async (promo) => {
    if (promo === "") {
      return setError("Promo yang anda masukkan kosong");
    }

    setLoading(true);

    const coffeeShopPromos = await addPromo(promo, coffeeShopId);

    if (!coffeeShopPromos) {
      return;
    }

    setCoffeeShopPromos(coffeeShopPromos);
    setLoading(false);
    setNewPromo("");
  };

  const handleEditPromo = async (promo, promoId) => {
    if (promo === "") {
      return setError("Promo yang anda masukkan kosong");
    }

    setLoading(true);

    const coffeeShopPromos = await editPromo(promo, promoId, coffeeShopId);

    if (!coffeeShopPromos) {
      return;
    }

    setCoffeeShopPromos(coffeeShopPromos);
    setLoading(false);
  };

  const handleDeletePromo = async () => {
    setLoading(true);

    const coffeeShopPromos = await deletePromo(deletePromoId, coffeeShopId);

    if (!coffeeShopPromos) {
      return;
    }

    setCoffeeShopPromos(coffeeShopPromos);
    setLoading(false);
    setDeletePromoId(null);
  };

  if (loading) {
    return (
      <Modal handleClose={handleClose} className="promos">
        <Spinner />
      </Modal>
    );
  }
  return (
    <>
      <Modal handleClose={handleClose} className="promos">
        <h1 className="promos__title">{coffeeShopName}</h1>
        {error && <ErrorMessage className="margin-b-8">{error}</ErrorMessage>}
        <PromoList
          promos={coffeeShopPromos?.promos}
          handleEditPromo={handleEditPromo}
          handleDeletePromo={handleShowWarning}
        />
        {showAddPromo ? (
          <AddPromo
            value={newPromo}
            handleChangeInput={(e) => setNewPromo(e.target.value)}
            handleSubmit={() => handleAddPromo(newPromo)}
            handleClose={() => setShowAddPromo(false)}
          />
        ) : (
          <Button
            className="promos__btn-add"
            onClick={() => setShowAddPromo(true)}
          >
            Tambah Promo
          </Button>
        )}
      </Modal>
      {deletePromoId ? (
        <WarningModal
          message="Apakah anda yakin ingin menghapus promo ini?"
          handleClose={handleCloseWarning}
          handleSubmit={handleDeletePromo}
        />
      ) : null}
    </>
  );
};

export default Promos;
